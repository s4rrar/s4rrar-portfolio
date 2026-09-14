"use client";

import React from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const { t } = useTranslation();
  const dir = t.dir;

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      left={dir === "rtl" ? undefined : "0"}
      right={dir === "rtl" ? "0" : undefined}
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
        zIndex: 10,
        userSelect: "none",
      }}
      position="fixed"
      paddingLeft={dir === "rtl" ? undefined : "24"}
      paddingRight={dir === "rtl" ? "24" : undefined}
      gap="16"
      m={{ hide: true }}
      aria-label="Table of contents"
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Column key={sectionIndex} gap="8">
            <Flex
              cursor="interactive"
              className={styles.tocItem}
              gap="12"
              vertical="center"
              onClick={() => scrollTo(section.title, 88)}
            >
              <div className={styles.indicator} />
              <Text
                variant="label-default-s"
                onBackground="neutral-weak"
                className={styles.tocText}
              >
                {section.title}
              </Text>
            </Flex>

            {about.tableOfContent.subItems && (
              <>
                {section.items.map((item, itemIndex) => (
                  <Flex
                    l={{ hide: true }}
                    key={itemIndex}
                    className={styles.tocItem}
                    gap="12"
                    paddingLeft={dir === "rtl" ? undefined : "16"}
                    paddingRight={dir === "rtl" ? "16" : undefined}
                    vertical="center"
                    onClick={() => scrollTo(item, 88)}
                  >
                    <div className={styles.subIndicator} />
                    <Text
                      variant="body-default-xs"
                      onBackground="neutral-weak"
                      className={styles.tocText}
                    >
                      {item}
                    </Text>
                  </Flex>
                ))}
              </>
            )}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
