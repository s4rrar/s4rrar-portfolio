import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  SmartLink,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { getTranslations, getDir } from "@/i18n";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    image: home.image,
    path: home.path,
  });
}

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const t = getTranslations(locale);
  const dir = getDir(locale);

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center" className="cursor-default">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
            >
              <Badge
                className="tactile-press"
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row gap="8" vertical="center" paddingY="2">
                  <strong dir="ltr">@s4rrar</strong>
                  <Line background="brand-alpha-strong" vert height="20" />
                  <Text onBackground="brand-medium">{t.home.featuredLabel}</Text>
                </Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l" className="display-optical">
              {t.home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t.home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            <Row gap="12" wrap horizontal="center">
              <Button
                id="about"
                className="tactile-press"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row
                  gap="8"
                  vertical="center"
                  paddingLeft={dir === "rtl" ? "4" : undefined}
                  paddingRight={dir === "rtl" ? undefined : "4"}
                >
                  {about.avatar.display && (
                    <Avatar
                      marginLeft={dir === "rtl" ? "8" : undefined}
                      marginRight={dir === "rtl" ? undefined : "8"}
                      style={
                        dir === "rtl" ? { marginRight: "-0.75rem" } : { marginLeft: "-0.75rem" }
                      }
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {t.about.title}
                </Row>
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* GitHub Projects Section */}
      <Column fillWidth maxWidth="l" paddingY="40">
        <RevealFx translateY="8" fillWidth>
          <Row fillWidth horizontal="between" vertical="end" wrap gap="12" paddingBottom="24">
            <Column gap="8">
              <Heading variant="display-strong-s" onBackground="neutral-strong">
                {t.projects.featured}
              </Heading>
              <Text variant="body-default-l" onBackground="neutral-weak">
                {t.projects.selection}
              </Text>
            </Column>
            <SmartLink
              href="https://github.com/s4rrar"
              suffixIcon="arrowUpRight"
              className="tactile-press"
            >
              <Text variant="label-default-s" onBackground="brand-medium">
                GitHub / s4rrar
              </Text>
            </SmartLink>
          </Row>
        </RevealFx>

        <RevealFx translateY="16" delay={0.2}>
          <Projects username="s4rrar" range={[1, 3]} />
        </RevealFx>
      </Column>

      <Line fill={true} />
      <Mailchimp />
    </Column>
  );
}
