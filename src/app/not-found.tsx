"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        {t.notFound.title}
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t.notFound.heading}
      </Heading>
      <Text onBackground="neutral-weak">{t.notFound.description}</Text>
    </Column>
  );
}
