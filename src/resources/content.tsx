import { About, Home, Newsletter, Person, Social } from "@/types";

const person: Person = {
  firstName: "AL-Hassan",
  lastName: "Sarrar",
  name: `AL-Hassan Sarrar`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "s4rrar@protonmail.com",
  location: "Asia/Jerusalem",
  languages: ["English", "Arabic", "Hebrew"],
};

const newsletter: Newsletter = {
  display: false,
  title: "",
  description: "",
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/s4rrar",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/s4rrar",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/s4rrar",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/metadata/screenshot.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "",
  featured: {
    display: true,
    title: "",
    href: "https://t.me/s4rrar",
  },
  subline: "",
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  telegram: {
    display: true,
    link: "https://t.me/s4rrar",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: "",
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Self-Employed",
        timeframe: "2023 — Present",
        role: "Freelance Software Engineer",
        achievements: [],
      },
      {
        company: "Jawwal",
        timeframe: "2025",
        role: "Software Engineer",
        achievements: [],
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
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Al-Quds University",
        description: "",
      },
      {
        name: "Udemy",
        description: "",
      },
    ],
  },
  technical: {
    display: false,
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: "",
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: "",
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

export { person, social, newsletter, home, about };
