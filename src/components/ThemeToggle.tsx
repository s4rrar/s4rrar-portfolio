"use client";

import React, { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";

import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  const label = `${t.theme.switchTo} ${nextTheme} ${t.theme.mode}`;

  return (
    <ToggleButton
      className={`tactile-press ${styles.toggleWrapper}`}
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
    />
  );
};
