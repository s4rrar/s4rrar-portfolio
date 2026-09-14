"use client";

import { Row, IconButton, SmartLink, Text, Line } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { useTranslation } from "@/i18n/LanguageProvider";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Row
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      className={styles.footerContainer}
      s={{ direction: "column" }}
    >
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="12"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            / {t.footer.follow} <SmartLink href="https://github.com/s4rrar">GitHub</SmartLink>
          </Text>
        </Text>
        <Row gap="12" vertical="center">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  className="tactile-press"
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                  aria-label={item.name}
                />
              ),
          )}
          <Line background="neutral-alpha-medium" vert maxHeight="20" />
          <IconButton
            className={`tactile-press ${styles.backToTop}`}
            onClick={scrollToTop}
            icon="arrowUp"
            tooltip={t.footer.backToTop}
            size="s"
            variant="ghost"
            aria-label={t.footer.backToTop}
          />
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
