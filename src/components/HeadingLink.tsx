"use client";

import React, { JSX, useState } from "react";
import { Heading, Flex, IconButton, useToast } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";

import styles from "@/components/HeadingLink.module.scss";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, style }) => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        addToast({
          variant: "success",
          message: t.headingLink.linkCopied,
        });
      },
      () => {
        addToast({
          variant: "danger",
          message: t.headingLink.copyFailed,
        });
      },
    );
  };

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level];
  const asTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Flex
      style={style}
      onClick={() => copyURL(id)}
      className={styles.control}
      vertical="center"
      gap="8"
    >
      <Heading className={styles.text} id={id} variant={variant} as={asTag}>
        {children}
      </Heading>
      <IconButton
        className={`tactile-press ${styles.visibility}`}
        size="s"
        icon={copied ? "check" : "openLink"}
        variant={copied ? "secondary" : "ghost"}
        tooltip={copied ? t.headingLink.linkCopied : t.headingLink.copy}
        tooltipPosition="right"
        aria-label={t.headingLink.copy}
      />
    </Flex>
  );
};
