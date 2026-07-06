const en = {
  locale: "en",
  dir: "ltr",
  label: "English",
  lang: "en",
  dateLocale: "en-us",
  person: {
    firstName: "AL-Hassan",
    lastName: "Sarrar",
    name: "AL-Hassan Sarrar",
    role: "Software Engineer",
    location: "Asia/Jerusalem",
  },
  home: {
    label: "Home",
    title: "AL-Hassan Sarrar's Portfolio",
    description: "Portfolio website showcasing my work as a Software Engineer",
    headline: "From abstract algorithms to functional, dynamic systems",
    featuredLabel: "Telegram",
    subline:
      "I'm AL-Hassan Sarrar, a computer scientist, interested in cybersecurity, software engineering and AI",
  },
  about: {
    label: "About",
    title: "About – AL-Hassan Sarrar",
    description: "Meet AL-Hassan Sarrar, Software Engineer from Asia/Jerusalem",
    telegram: "Contact via Telegram",
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      email: "Email",
    },
    intro: {
      title: "Introduction",
      description:
        "AL-Hassan Sarrar is a computer scientist specializing in software engineering, data science, ML, AI, and cyber security. With a strong foundation in developing robust software systems, analyzing complex data sets, and ensuring secure digital environments, focuses on leveraging technology to solve real-world problems. Passionate about innovation, stays at the forefront of industry trends to deliver efficient, scalable, and secure solutions.",
    },
    work: {
      title: "Work Experience",
      experiences: [
        {
          company: "Self-Employed",
          timeframe: "2023 — Present",
          role: "Freelance Software Engineer",
          achievements: [
            "Delivered full-stack web applications tailored to diverse client specifications.",
            "Developed user-friendly, cross-platform mobile applications.",
            "Built custom, high-performance desktop applications.",
            "Integrated local AI models and external APIs to enhance application capabilities.",
            "Managed and optimized databases to support varied project requirements.",
          ],
        },
        {
          company: "Jawwal",
          timeframe: "2025",
          role: "Software Engineer",
          achievements: [
            "Transformed the inspection and documentation system for telecom towers and infrastructure from a fully paper-based process to a complete digital platform, increasing data accuracy and accessibility.",
            "Implemented end-to-end electronic workflows, eliminating manual paperwork and reducing reporting time by over 50%.",
          ],
          images: [
            {
              src: "/images/projects/project-01/cover-01.png",
              alt: "Jawwal Towers",
              width: 16,
              height: 9,
            },
          ],
        },
      ],
    },
    studies: {
      title: "Studies",
      institutions: [
        {
          name: "Al-Quds University",
          description: "Studied computer science.",
        },
        {
          name: "Udemy",
          description:
            "Completed multiple online courses in software development, cyber security, data science, ML and AI to enhance technical and professional skills.",
        },
      ],
    },
    technical: {
      title: "Technical skills",
    },
  },
  notFound: {
    title: "404",
    heading: "Page Not Found",
    description: "The page you are looking for does not exist.",
  },
  footer: {
    follow: "Follow me on",
  },
  routeGuard: {
    incorrectPassword: "Incorrect password",
    passwordProtected: "This page is password protected",
    password: "Password",
    submit: "Submit",
  },
  mailchimp: {
    invalidEmail: "Please enter a valid email address.",
    email: "Email",
    subscribe: "Subscribe",
  },
  projectCard: {
    readCaseStudy: "Read case study",
    viewProject: "View project",
  },
  headingLink: {
    linkCopied: "Link copied to clipboard.",
    copyFailed: "Failed to copy link.",
    copy: "Copy",
  },
  projects: {
    featured: "Featured Projects",
    selection: "A selection of my work from GitHub",
    loading: "Loading projects...",
    error: "Error loading projects",
    viewCode: "View Code",
    liveDemo: "Live Demo",
    noProjects: "No projects found",
  },
  theme: {
    switchTo: "Switch to",
    mode: "mode",
  },
};

export type Translation = typeof en;
export { en };
