"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useTranslation } from "@/i18n/LanguageProvider";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.cardWrapper}>
      <Column fillWidth gap="m">
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
        <Flex
          s={{ direction: "column" }}
          fillWidth
          paddingX="m"
          paddingTop="8"
          paddingBottom="24"
          gap="l"
        >
          {title && (
            <Flex flex={5}>
              <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </Flex>
          )}
          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              {description?.trim() && (
                <Text
                  wrap="balance"
                  variant="body-default-m"
                  onBackground="neutral-weak"
                  style={{ lineHeight: "1.6" }}
                >
                  {description}
                </Text>
              )}
              <Flex gap="24" wrap paddingTop="4">
                {content?.trim() && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    className={`tactile-press ${styles.linkItem}`}
                    style={{ margin: "0", width: "fit-content" }}
                    href={href}
                  >
                    <Text variant="label-default-s">{t.projectCard.readCaseStudy}</Text>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    className={`tactile-press ${styles.linkItem}`}
                    style={{ margin: "0", width: "fit-content" }}
                    href={link}
                  >
                    <Text variant="label-default-s">{t.projectCard.viewProject}</Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </Column>
    </div>
  );
};
