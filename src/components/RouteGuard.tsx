"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import {
  Flex,
  Spinner,
  Button,
  Heading,
  Column,
  Row,
  PasswordInput,
  Icon,
  Card,
} from "@once-ui-system/core";
import NotFound from "@/app/not-found";
import { useTranslation } from "@/i18n/LanguageProvider";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    if (!password || submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setError(undefined);
      } else {
        setError(t.routeGuard.incorrectPassword);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch {
      setError(t.routeGuard.incorrectPassword);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner size="m" />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <div
          className={isShaking ? "shake-reject" : ""}
          style={{ width: "100%", maxWidth: "380px" }}
        >
          <Card
            fillWidth
            padding="32"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
            style={{
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <Column fillWidth gap="24" horizontal="center" align="center">
              <Row
                padding="16"
                radius="full"
                background="brand-alpha-weak"
                border="brand-alpha-medium"
                horizontal="center"
                vertical="center"
              >
                <Icon name="lock" size="m" onBackground="brand-medium" />
              </Row>
              <Column gap="8" horizontal="center" style={{ textAlign: "center" }}>
                <Heading variant="heading-strong-m" align="center" wrap="balance">
                  {t.routeGuard.passwordProtected}
                </Heading>
              </Column>
              <Column
                as="form"
                fillWidth
                gap="16"
                horizontal="center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordSubmit();
                }}
              >
                <PasswordInput
                  id="password"
                  label={t.routeGuard.password}
                  value={password}
                  autoFocus
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(undefined);
                  }}
                  errorMessage={error}
                />
                <Button
                  className="tactile-press"
                  fillWidth
                  onClick={handlePasswordSubmit}
                  disabled={submitting || !password}
                >
                  {submitting ? <Spinner size="s" /> : t.routeGuard.submit}
                </Button>
              </Column>
            </Column>
          </Card>
        </div>
      </Flex>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
