"use client";

import { useState, useEffect } from "react";
import { Column, Row, Heading, Text, Button, Card } from "@once-ui-system/core";
import { FaStar, FaCodeFork } from "react-icons/fa6";
import { useTranslation } from "@/i18n/LanguageProvider";

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

  useEffect(() => {
    async function fetchRepos() {
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
    }

    fetchRepos();
  }, [username]);

  if (loading) {
    return (
      <Column fillWidth horizontal="center" paddingY="40">
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t.projects.loading}
        </Text>
      </Column>
    );
  }

  if (error) {
    return (
      <Column fillWidth horizontal="center" paddingY="40">
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t.projects.error}: {error}
        </Text>
      </Column>
    );
  }

  const displayedRepos = repos.slice(range[0] - 1, range[1]);

  return (
    <Column fillWidth gap="m">
      {displayedRepos.map((repo) => (
        <Card
          key={repo.id}
          fillWidth
          padding="24"
          border="neutral-medium"
          background="surface"
          radius="l"
        >
          <Column fillWidth gap="16">
            {/* Project Header */}
            <Row fillWidth className="justify-between" vertical="center">
              <Column gap="4">
                <Heading variant="heading-strong-l" onBackground="neutral-strong">
                  {repo.name}
                </Heading>
                {repo.language && (
                  <Row gap="8" vertical="center">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    />
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {repo.language}
                    </Text>
                  </Row>
                )}
              </Column>
              <Row gap="16" vertical="center">
                <Row gap="4" vertical="center">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    <FaStar size={14} /> {repo.stargazers_count}
                  </Text>
                </Row>
                <Row gap="4" vertical="center">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    <FaCodeFork size={14} /> {repo.forks_count}
                  </Text>
                </Row>
              </Row>
            </Row>

            {/* Description */}
            {repo.description && (
              <Text variant="body-default-m" onBackground="neutral-medium">
                {repo.description}
              </Text>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <Row gap="8" wrap>
                {repo.topics.slice(0, 5).map((topic) => (
                  <div
                    key={topic}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "16px",
                      backgroundColor: "var(--brand-alpha-weak)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--neutral-strong)",
                    }}
                  >
                    {topic}
                  </div>
                ))}
              </Row>
            )}

            {/* Actions */}
            <Row gap="12" fillWidth>
              <Button href={repo.html_url} variant="secondary" size="s">
                {t.projects.viewCode}
              </Button>
              {repo.homepage && (
                <Button href={repo.homepage} variant="tertiary" size="s">
                  {t.projects.liveDemo}
                </Button>
              )}
            </Row>
          </Column>
        </Card>
      ))}

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
  };

  return colors[language] || "#8b949e";
}
