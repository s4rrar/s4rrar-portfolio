"use client";

import { Column, Heading, Text, Button, Card, Row } from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Column as="section" fill center paddingY="128" paddingX="m">
      <Card
        padding="40"
        radius="l"
        maxWidth={32}
        horizontal="center"
        border="neutral-alpha-weak"
        background="surface"
        style={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
          textAlign: "center",
        }}
      >
        <Column horizontal="center" gap="16">
          <Text
            variant="display-strong-xl"
            className="display-optical"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              lineHeight: 1,
              background: "linear-gradient(135deg, var(--brand-medium), var(--brand-alpha-strong))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.notFound.title}
          </Text>
          <Heading variant="heading-strong-l" onBackground="neutral-strong">
            {t.notFound.heading}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: "1.6" }}>
            {t.notFound.description}
          </Text>
          <Row paddingTop="12">
            <Button
              className="tactile-press"
              href="/"
              variant="secondary"
              size="m"
              prefixIcon="home"
            >
              {t.notFound.backToHome}
            </Button>
          </Row>
        </Column>
      </Card>
    </Column>
  );
}
