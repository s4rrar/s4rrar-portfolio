"use client";

import { useState, useEffect, useCallback } from "react";
import { Column, Row, Heading, Text, Button, Card, Icon } from "@once-ui-system/core";
import { FaStar, FaCodeFork, FaGithub } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { useTranslation } from "@/i18n/LanguageProvider";
import styles from "./Projects.module.scss";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

interface ProjectsProps {
  range?: [number, number];
  username?: string;
}

export function Projects({ range = [1, 6], username = "YOUR_GITHUB_USERNAME" }: ProjectsProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      );

      if (!response.ok) {
        throw new Error(t.projects.error);
      }

      const data: GitHubRepo[] = await response.json();

      // Filter out forks and sort by stars
      const filteredRepos = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

      setRepos(filteredRepos);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  }, [username, t.projects.error]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  if (loading) {
    return (
      <Column fillWidth gap="m" aria-busy="true" aria-label={t.projects.loading}>
        {[1, 2, 3].map((item) => (
          <Card
            key={item}
            fillWidth
            padding="24"
            border="neutral-alpha-weak"
            background="surface"
            radius="l"
            style={{ minHeight: "170px" }}
          >
            <Column fillWidth gap="16">
              <Row fillWidth horizontal="between" vertical="center">
                <Column gap="8">
                  <div className="skeleton-shimmer" style={{ width: "160px", height: "24px" }} />
                  <div className="skeleton-shimmer" style={{ width: "90px", height: "16px" }} />
                </Column>
                <Row gap="8">
                  <div
                    className="skeleton-shimmer"
                    style={{ width: "50px", height: "24px", borderRadius: "9999px" }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ width: "50px", height: "24px", borderRadius: "9999px" }}
                  />
                </Row>
              </Row>
              <div className="skeleton-shimmer" style={{ width: "85%", height: "18px" }} />
              <Row gap="8">
                <div
                  className="skeleton-shimmer"
                  style={{ width: "70px", height: "26px", borderRadius: "9999px" }}
                />
                <div
                  className="skeleton-shimmer"
                  style={{ width: "60px", height: "26px", borderRadius: "9999px" }}
                />
                <div
                  className="skeleton-shimmer"
                  style={{ width: "80px", height: "26px", borderRadius: "9999px" }}
                />
              </Row>
            </Column>
          </Card>
        ))}
      </Column>
    );
  }

  if (error) {
    return (
      <Card
        fillWidth
        padding="32"
        radius="l"
        horizontal="center"
        border="neutral-alpha-weak"
        background="surface"
      >
        <Column horizontal="center" gap="16" style={{ textAlign: "center" }}>
          <Icon name="warning" size="l" onBackground="accent-medium" />
          <Heading variant="heading-strong-m">{t.projects.error}</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {error}
          </Text>
          <Row gap="12" paddingTop="8">
            <Button
              className="tactile-press"
              onClick={fetchRepos}
              variant="secondary"
              size="s"
              prefixIcon="refresh"
            >
              Retry
            </Button>
            <Button
              className="tactile-press"
              href={`https://github.com/${username}`}
              variant="tertiary"
              size="s"
              prefixIcon="openLink"
            >
              GitHub Profile
            </Button>
          </Row>
        </Column>
      </Card>
    );
  }

  const displayedRepos = repos.slice(range[0] - 1, range[1]);

  return (
    <Column fillWidth gap="m">
      {displayedRepos.map((repo) => {
        const langColor = repo.language ? getLanguageColor(repo.language) : null;

        return (
          <div
            key={repo.id}
            className={styles.projectCard}
            style={{ borderRadius: "var(--radius-l, 16px)" }}
          >
            <Column fillWidth padding="24" gap="16">
              {/* Project Header */}
              <Row fillWidth horizontal="between" vertical="center" wrap gap="12">
                <Column gap="4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Row gap="8" vertical="center">
                      <Heading variant="heading-strong-l" className={styles.repoTitle}>
                        {repo.name}
                      </Heading>
                      <HiArrowUpRight size={18} className={styles.titleArrow} />
                    </Row>
                  </a>
                  {repo.language && (
                    <Row gap="8" vertical="center">
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: langColor || "var(--neutral-medium)",
                          boxShadow: langColor ? `0 0 8px ${langColor}` : undefined,
                        }}
                      />
                      <Text variant="label-default-s" onBackground="neutral-weak">
                        {repo.language}
                      </Text>
                    </Row>
                  )}
                </Column>

                {/* Stargazers & Forks */}
                <Row gap="8" vertical="center">
                  <Row
                    gap="4"
                    vertical="center"
                    paddingX="8"
                    paddingY="4"
                    radius="full"
                    background="neutral-alpha-weak"
                    border="neutral-alpha-weak"
                  >
                    <FaStar size={12} color="#eab308" />
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      {repo.stargazers_count}
                    </Text>
                  </Row>
                  <Row
                    gap="4"
                    vertical="center"
                    paddingX="8"
                    paddingY="4"
                    radius="full"
                    background="neutral-alpha-weak"
                    border="neutral-alpha-weak"
                  >
                    <FaCodeFork size={12} />
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {repo.forks_count}
                    </Text>
                  </Row>
                </Row>
              </Row>

              {/* Description */}
              {repo.description && (
                <Text
                  variant="body-default-m"
                  onBackground="neutral-medium"
                  style={{ lineHeight: "1.6" }}
                >
                  {repo.description}
                </Text>
              )}

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <Row gap="8" wrap>
                  {repo.topics.slice(0, 6).map((topic) => (
                    <span key={topic} className={styles.topicTag}>
                      {topic}
                    </span>
                  ))}
                </Row>
              )}

              {/* Actions */}
              <Row gap="12" fillWidth paddingTop="4">
                <Button className="tactile-press" href={repo.html_url} variant="secondary" size="s">
                  <Row gap="8" vertical="center">
                    <FaGithub size={14} />
                    <span>{t.projects.viewCode}</span>
                  </Row>
                </Button>
                {repo.homepage && (
                  <Button
                    className="tactile-press"
                    href={repo.homepage}
                    variant="tertiary"
                    size="s"
                    suffixIcon="arrowUpRight"
                  >
                    {t.projects.liveDemo}
                  </Button>
                )}
              </Row>
            </Column>
          </div>
        );
      })}

      {displayedRepos.length === 0 && (
        <Column fillWidth horizontal="center" paddingY="40">
          <Text variant="body-default-m" onBackground="neutral-weak">
            {t.projects.noProjects}
          </Text>
        </Column>
      )}
    </Column>
  );
}

// Helper function for language colors
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    React: "#61dafb",
    Shell: "#89e051",
  };

  return colors[language] || "#8b949e";
}
