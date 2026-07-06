"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse coordinates
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      targetX: null as number | null,
      targetY: null as number | null,
    };

    // Particle details
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      colorType: "brand" | "accent" | "neutral";
      alpha: number;
    }

    // Large blurry background orbs
    interface Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorType: "brand" | "accent" | "neutral";
      parallaxFactor: number;
    }

    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // We will resolve actual RGB colors in the rendering loop or on change
    const colors = {
      brand: "0, 180, 216",
      accent: "239, 71, 111",
      neutral: "100, 116, 139",
      line: "rgba(100, 116, 139, 0.08)",
    };

    let isDarkMode = true;

    // Helper to extract RGB triplet from a color string
    const parseToRgb = (colorStr: string): string | null => {
      if (!colorStr) return null;
      // Hex format (#fff or #ffffff)
      if (colorStr.startsWith("#")) {
        const hex = colorStr.slice(1);
        const len = hex.length;
        if (len === 3) {
          const r = parseInt(hex[0] + hex[0], 16);
          const g = parseInt(hex[1] + hex[1], 16);
          const b = parseInt(hex[2] + hex[2], 16);
          return `${r}, ${g}, ${b}`;
        }
        if (len === 6 || len === 8) {
          const r = parseInt(hex.slice(0, 2), 16);
          const g = parseInt(hex.slice(2, 4), 16);
          const b = parseInt(hex.slice(4, 6), 16);
          return `${r}, ${g}, ${b}`;
        }
      }
      // rgb/rgba format
      const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
      }
      // Raw coordinate format (e.g. "12 34 56")
      if (/^\d+\s+\d+\s+\d+$/.test(colorStr)) {
        return colorStr.split(/\s+/).join(", ");
      }
      if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(colorStr)) {
        return colorStr;
      }
      return null;
    };

    const updateThemeColors = () => {
      if (typeof window === "undefined") return;
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      
      isDarkMode = root.getAttribute("data-theme") !== "light";

      // Read Once UI CSS variables
      const rawBrand = styles.getPropertyValue("--brand-medium").trim() || 
                        styles.getPropertyValue("--brand-solid").trim() ||
                        styles.getPropertyValue("--brand-strong").trim() ||
                        "";
      const rawAccent = styles.getPropertyValue("--accent-medium").trim() || 
                         styles.getPropertyValue("--accent-solid").trim() ||
                         styles.getPropertyValue("--accent-strong").trim() ||
                         "";
      const rawNeutral = styles.getPropertyValue("--neutral-medium").trim() || 
                          styles.getPropertyValue("--neutral-solid").trim() ||
                          "";

      const parsedBrand = parseToRgb(rawBrand);
      const parsedAccent = parseToRgb(rawAccent);
      const parsedNeutral = parseToRgb(rawNeutral);

      if (parsedBrand) colors.brand = parsedBrand;
      else colors.brand = isDarkMode ? "0, 180, 216" : "0, 150, 199";

      if (parsedAccent) colors.accent = parsedAccent;
      else colors.accent = isDarkMode ? "239, 71, 111" : "230, 57, 70";

      if (parsedNeutral) colors.neutral = parsedNeutral;
      else colors.neutral = isDarkMode ? "148, 163, 184" : "100, 116, 139";

      if (isDarkMode) {
        colors.line = "rgba(255, 255, 255, 0.05)";
      } else {
        colors.line = "rgba(0, 0, 0, 0.035)";
      }
    };

    // Observe HTML element attributes to dynamically update colors when theme changes
    const observer = new MutationObserver(() => {
      updateThemeColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style", "class"],
    });

    updateThemeColors();

    // Init dimensions & objects
    const initCanvasElements = () => {
      if (!canvas) return;
      const dpi = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);

      // Create particles (fewer on mobile to save battery and GPU cycles)
      const particleCount = Math.min(Math.floor((width * height) / 22000), 45);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const baseRadius = Math.random() * 2 + 0.8;
        const colorType = i % 3 === 0 ? "brand" : i % 3 === 1 ? "accent" : "neutral";
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: baseRadius,
          baseRadius,
          colorType,
          alpha: Math.random() * 0.45 + 0.15,
        });
      }

      // Initialize background orbs
      orbs = [
        {
          x: width * 0.2,
          y: height * 0.25,
          vx: 0.04,
          vy: 0.03,
          radius: Math.min(width, height) * 0.32,
          colorType: "brand",
          parallaxFactor: 0.04,
        },
        {
          x: width * 0.8,
          y: height * 0.75,
          vx: -0.03,
          vy: 0.03,
          radius: Math.min(width, height) * 0.28,
          colorType: "accent",
          parallaxFactor: -0.05,
        },
        {
          x: width * 0.5,
          y: height * 0.55,
          vx: 0.015,
          vy: -0.015,
          radius: Math.min(width, height) * 0.22,
          colorType: "neutral",
          parallaxFactor: 0.02,
        },
      ];
    };

    initCanvasElements();

    // Event listeners for user interaction
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const onMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    const onResize = () => {
      initCanvasElements();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    // Dynamic animation loop
    const renderFrame = () => {
      // Pause drawing if tab is completely hidden
      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(renderFrame);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate easing
      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null || mouse.y === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // 1. Draw soft gradient background orbs with subtle parallax
      orbs.forEach((orb) => {
        // Slow float
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce/wrap borders
        if (orb.x - orb.radius > width) orb.x = -orb.radius;
        if (orb.x + orb.radius < 0) orb.x = width + orb.radius;
        if (orb.y - orb.radius > height) orb.y = -orb.radius;
        if (orb.y + orb.radius < 0) orb.y = height + orb.radius;

        let renderX = orb.x;
        let renderY = orb.y;

        // Apply easing-based mouse parallax shift
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - width / 2;
          const dy = mouse.y - height / 2;
          renderX += dx * orb.parallaxFactor;
          renderY += dy * orb.parallaxFactor;
        }

        // Draw radial glowing gradient
        const grad = ctx.createRadialGradient(
          renderX,
          renderY,
          0,
          renderX,
          renderY,
          orb.radius
        );

        const baseRgb = colors[orb.colorType];
        
        // Extremely soft transparency levels appropriate for background glow
        const startOpacity = isDarkMode ? "0.08" : "0.05";
        const midOpacity = isDarkMode ? "0.03" : "0.02";

        grad.addColorStop(0, `rgba(${baseRgb}, ${startOpacity})`);
        grad.addColorStop(0.5, `rgba(${baseRgb}, ${midOpacity})`);
        grad.addColorStop(1, `rgba(${baseRgb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(renderX, renderY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 1.5. Draw cursor spotlight/radial glow (behind connections and particles)
      if (mouse.x !== null && mouse.y !== null) {
        // Layer 1: Large soft ambient glow (brand color)
        const ambientRadius = 260;
        const ambientGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          ambientRadius
        );
        const brandColor = colors.brand;
        const ambientOpacity = isDarkMode ? 0.08 : 0.16;
        ambientGlow.addColorStop(0, `rgba(${brandColor}, ${ambientOpacity})`);
        ambientGlow.addColorStop(0.5, `rgba(${brandColor}, ${ambientOpacity * 0.3})`);
        ambientGlow.addColorStop(1, `rgba(${brandColor}, 0)`);
        
        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, ambientRadius, 0, Math.PI * 2);
        ctx.fill();

        // Layer 2: Concentrated core glow (accent color)
        const coreRadius = 90;
        const coreGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          coreRadius
        );
        const accentColor = colors.accent;
        const coreOpacity = isDarkMode ? 0.06 : 0.12;
        coreGlow.addColorStop(0, `rgba(${accentColor}, ${coreOpacity})`);
        coreGlow.addColorStop(0.6, `rgba(${accentColor}, ${coreOpacity * 0.25})`);
        coreGlow.addColorStop(1, `rgba(${accentColor}, 0)`);
        
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // Layer 3: Elegant, thin tracking circle (lagging cursor ring)
        ctx.strokeStyle = `rgba(${brandColor}, ${isDarkMode ? 0.25 : 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Draw connections (lines) between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          // Connect particles within 110px
          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.12;
            ctx.strokeStyle = colors.line;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // 3. Draw particles and apply repulsion physics
      particles.forEach((p) => {
        // Organic Brownian-style motion noise
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        // Interaction with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const activeRadius = 130;

          if (dist < activeRadius) {
            const ratio = (activeRadius - dist) / activeRadius; // 0 to 1
            const forceDirection = Math.atan2(dy, dx);
            
            // Push away from mouse
            p.vx += Math.cos(forceDirection) * ratio * 0.15;
            p.vy += Math.sin(forceDirection) * ratio * 0.15;

            // Micro-animation: swell size and draw a thin thread to mouse when close
            p.radius = p.baseRadius + ratio * 2.0;

            const threadAlpha = ratio * 0.1;
            const threadColor = colors[p.colorType];
            ctx.strokeStyle = `rgba(${threadColor}, ${threadAlpha})`;
            ctx.lineWidth = 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          } else {
            // Smoothly shrink back to base size
            p.radius += (p.baseRadius - p.radius) * 0.08;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.08;
        }

        // Limit velocity to keep movements elegant and slow
        const velocity = Math.hypot(p.vx, p.vy);
        const maxV = 1.0;
        const minV = 0.12;
        if (velocity > maxV) {
          p.vx = (p.vx / velocity) * maxV;
          p.vy = (p.vy / velocity) * maxV;
        } else if (velocity < minV) {
          p.vx = (p.vx / (velocity || 1)) * minV;
          p.vy = (p.vy / (velocity || 1)) * minV;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Handle wrapping at edge boundary margins
        const boundaryMargin = 30;
        if (p.x < -boundaryMargin) p.x = width + boundaryMargin;
        if (p.x > width + boundaryMargin) p.x = -boundaryMargin;
        if (p.y < -boundaryMargin) p.y = height + boundaryMargin;
        if (p.y > height + boundaryMargin) p.y = -boundaryMargin;

        // Render dot
        const pColor = colors[p.colorType];
        ctx.fillStyle = `rgba(${pColor}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "normal",
      }}
    />
  );
}
