"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Text, IconButton, Icon } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";

const languages = [
  { code: "en" as const, codeLabel: "EN", name: "English" },
  { code: "ar" as const, codeLabel: "AR", name: "العربية" },
  { code: "he" as const, codeLabel: "HE", name: "עברית" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <IconButton
        className="tactile-press"
        icon="globe"
        variant="ghost"
        size="s"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
      />
      <Row
        position="absolute"
        direction="column"
        radius="m"
        padding="8"
        gap="4"
        style={{
          top: isMobile ? "auto" : "calc(100% + 8px)",
          bottom: isMobile ? "calc(100% + 8px)" : "auto",
          insetInlineEnd: "0",
          zIndex: 100,
          minWidth: "148px",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backgroundColor: "var(--surface-translucent)",
          border: "1px solid var(--neutral-alpha-weak)",
          borderTop: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : isMobile
              ? "translateY(8px) scale(0.95)"
              : "translateY(-8px) scale(0.95)",
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
          transition:
            "opacity 0.18s cubic-bezier(0.2, 0, 0, 1), transform 0.18s cubic-bezier(0.2, 0, 0, 1), visibility 0.18s",
          transformOrigin: isMobile ? "bottom right" : "top right",
        }}
        role="listbox"
        aria-label="Languages"
      >
        {languages.map((lang) => {
          const active = locale === lang.code;
          return (
            <Row
              key={lang.code}
              paddingX="12"
              paddingY="8"
              radius="s"
              horizontal="between"
              vertical="center"
              role="option"
              aria-selected={active}
              style={{
                cursor: "pointer",
                background: active ? "var(--brand-alpha-weak)" : "transparent",
                color: active ? "var(--brand-strong)" : "var(--neutral-strong)",
                transition: "background-color 0.12s ease",
                userSelect: "none",
              }}
              className="tactile-press"
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
                router.refresh();
              }}
            >
              <Row gap="8" vertical="center">
                <Text
                  variant="label-default-xs"
                  style={{
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: active
                      ? "var(--brand-alpha-medium)"
                      : "var(--neutral-alpha-weak)",
                    fontFamily: "var(--font-code)",
                    fontSize: "11px",
                  }}
                >
                  {lang.codeLabel}
                </Text>
                <Text
                  variant="body-default-s"
                  style={{
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {lang.name}
                </Text>
              </Row>
              {active && <Icon name="check" size="xs" onBackground="brand-medium" />}
            </Row>
          );
        })}
      </Row>
    </div>
  );
}
