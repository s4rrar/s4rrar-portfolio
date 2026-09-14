import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social, home } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { getTranslations, getDir } from "@/i18n";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: home.image,
    path: about.path,
  });
}

export default async function About() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const t = getTranslations(locale);
  const dir = getDir(locale);

  const structure = [
    {
      title: t.about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: t.about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: t.about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: t.about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m" className="cursor-default">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {about.tableOfContent.display && (
        <TableOfContents key="toc-static" structure={structure} about={about} />
      )}

      <Row fillWidth s={{ direction: "column" }} horizontal="center" gap="xl">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="80"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <div
              style={{
                position: "relative",
                padding: "3px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--brand-medium), var(--accent-alpha-medium, var(--brand-alpha-weak)))",
                boxShadow: "0 0 20px var(--brand-alpha-weak)",
              }}
            >
              <Avatar src={person.avatar} size="xl" />
            </div>
            <Row
              gap="8"
              vertical="center"
              textVariant="label-default-s"
              onBackground="neutral-weak"
            >
              <Icon onBackground="brand-medium" name="globe" size="xs" />
              <span>{t.person.location}</span>
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8" horizontal="center">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="m" className="tactile-press">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={t.about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.telegram.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={`tactile-press ${styles.blockAlign}`}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                }}
              >
                <Icon
                  paddingLeft={dir === "rtl" ? undefined : "12"}
                  paddingRight={dir === "rtl" ? "12" : undefined}
                  name="telegram"
                  onBackground="brand-weak"
                />
                <Row paddingX="8">{t.about.telegram}</Row>
                <IconButton
                  href={about.telegram.link}
                  data-border="rounded"
                  variant="secondary"
                  size="s"
                  icon={dir === "rtl" ? "chevronLeft" : "chevronRight"}
                  aria-label={t.about.telegram}
                />
              </Row>
            )}
            <Heading className={`${styles.textAlign} display-optical`} variant="display-strong-xl">
              {t.person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="heading-default-l"
              onBackground="neutral-weak"
            >
              {t.person.role}
            </Text>

            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            className="tactile-press"
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={t.about.social[item.icon as keyof typeof t.about.social]}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            className="tactile-press"
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                            aria-label={item.name}
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column
              id={t.about.intro.title}
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
              style={{ lineHeight: "1.75" }}
              onBackground="neutral-medium"
            >
              {t.about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={t.about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {t.about.work.title}
              </Heading>

              <Column
                fillWidth
                className="timeline-track"
                gap="xl"
                marginBottom="40"
                style={{ paddingInlineStart: "28px" }}
              >
                {t.about.work.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                    style={{ position: "relative" }}
                  >
                    {/* Milestone node marker */}
                    <div
                      className="timeline-node"
                      style={{
                        position: "absolute",
                        insetInlineStart: "-28px",
                        top: "6px",
                      }}
                    />

                    <Row
                      fillWidth
                      horizontal="between"
                      vertical="end"
                      marginBottom="4"
                      wrap
                      gap="8"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="label-default-xs"
                        onBackground="neutral-weak"
                        style={{
                          padding: "3px 10px",
                          borderRadius: "9999px",
                          background: "var(--neutral-alpha-weak)",
                          border: "1px solid var(--neutral-alpha-weak)",
                        }}
                      >
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      {experience.role}
                    </Text>
                    <Column gap="12">
                      {experience.achievements.map((achievement: React.ReactNode, i: number) => (
                        <Row key={i} gap="8" vertical="start">
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: "var(--neutral-weak)",
                              marginTop: "8px",
                              flexShrink: 0,
                            }}
                          />
                          <Text
                            variant="body-default-m"
                            style={{ lineHeight: "1.65" }}
                            onBackground="neutral-medium"
                          >
                            {achievement}
                          </Text>
                        </Row>
                      ))}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {experience.images.map((image, i) => (
                          <Row
                            key={i}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                            style={{ overflow: "hidden" }}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={t.about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {t.about.studies.title}
              </Heading>

              <Column
                fillWidth
                className="timeline-track"
                gap="xl"
                marginBottom="40"
                style={{ paddingInlineStart: "28px" }}
              >
                {t.about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                    style={{ position: "relative" }}
                  >
                    <div
                      className="timeline-node"
                      style={{
                        position: "absolute",
                        insetInlineStart: "-28px",
                        top: "6px",
                      }}
                    />
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text
                      variant="body-default-m"
                      onBackground="neutral-weak"
                      style={{ lineHeight: "1.6" }}
                    >
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={t.about.technical.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {t.about.technical.title}
              </Heading>

              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="l"
                            prefixIcon={dir === "rtl" ? undefined : tag.icon}
                            suffixIcon={dir === "rtl" ? tag.icon : undefined}
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, i) => (
                          <Row
                            key={i}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
