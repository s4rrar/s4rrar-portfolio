"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Icon, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/i18n/LanguageProvider";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale: localeProp = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");
  const { t } = useTranslation();
  const resolvedLocale = t.locale === "ar" ? "ar-SA" : t.locale === "he" ? "he-IL" : localeProp;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(resolvedLocale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, resolvedLocale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const { t } = useTranslation();

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center">
          {display.location && (
            <Row
              s={{ hide: true }}
              vertical="center"
              textVariant="label-default-s"
              onBackground="neutral-weak"
            >
              <span>{t.person.location}</span>
            </Row>
          )}
        </Row>
        <Row fillWidth horizontal="center">
          <Row className={styles.navDock} radius="m-4" padding="4" horizontal="center" zIndex={1}>
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton
                  className="tactile-press"
                  prefixIcon="home"
                  href="/"
                  selected={pathname === "/"}
                  aria-label={t.home.label}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      className="tactile-press"
                      prefixIcon="person"
                      href="/about"
                      label={t.about.label}
                      selected={pathname === "/about"}
                      aria-label={t.about.label}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      className="tactile-press"
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                      aria-label={t.about.label}
                    />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              <LanguageSwitcher />
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && (
                <Row
                  gap="8"
                  vertical="center"
                  textVariant="label-default-s"
                  onBackground="neutral-weak"
                >
                  <Icon name="clock" size="xs" onBackground="neutral-weak" />
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>
                    <TimeDisplay timeZone={person.location} />
                  </span>
                </Row>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
