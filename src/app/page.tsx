"use client";

import SocialMedia from "@/components/SocialMedia";
import { AnimateIn } from "@/components/animations/AnimateIn";
import { Tooltip } from "@/components/Tooltip";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

/* ----------------------------- DATA ----------------------------- */

type Project = {
  title: string;
  description: string;
  link?: string;
  github?: string;
  technologies: string[];
};

type Job = {
  role: string;
  company: string;
  period: string;
  points: string[];
  technologies: string[];
};

const summary =
  "Backend-focused full-stack developer building high-throughput REST APIs, distributed microservices and queue-driven workflows. I also work with LLM integrations, real-time Socket.io systems, and modern UIs in React and Next.js.";

const education = [
  {
    degree: "Master of Computer Applications",
    period: "2025 - 2027",
    school: "JIS College of Engineering, Kalyani, West Bengal",
    note: "Pursuing",
  },
  {
    degree: "Bachelor of Computer Applications",
    period: "2022 - 2025",
    school: "JIS College of Engineering, Kalyani, West Bengal",
    note: "CGPA: 7.90",
  },
];

const projects: Project[] = [
  {
    title: "AskPDF - RAG Document Q&A",
    description:
      "Upload a PDF and chat with it. A 5-stage async pipeline (parse, chunk, embed, index, search) built on LangChain and Qdrant. PDF processing is decoupled through a BullMQ worker on Redis, returning HTTP 202 immediately while status is tracked in MongoDB. Retrieval is document-scoped with a 0.7 similarity threshold to drop low-relevance context before Gemini generates the answer, streamed over SSE with source page citations.",
    // TODO: add your AskPDF repo / live URL here
    github: "https://github.com/myselfsandip/ask-pdf",
    link: undefined,
    technologies: [
      "Node.js",
      "Express.js",
      "Next.js",
      "LangChain",
      "Qdrant",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Gemini API",
    ],
  },
  {
    title: "Realtime Chat App",
    description:
      "Microservice-based chat platform with low-latency bidirectional messaging over Socket.io. RabbitMQ handles reliable message queuing and Redis caching keeps data access and real-time updates fast under high concurrency. Deployed on AWS.",
    github: "https://github.com/myselfsandip/microservice-chat-app",
    technologies: [
      "Next.js",
      "Express.js",
      "Socket.io",
      "RabbitMQ",
      "Redis",
      "AWS",
    ],
  },
  {
    title: "Public News & Media Platform (Company Project at Indomitech Global)",
    description:
      "Next.js frontend with Node.js and Express APIs, role-based access control and admin workflows for users, content and permissions, scheduled post publishing, Razorpay payments for subscriptions, and push notifications with deep linking for Android and iOS.",
    technologies: [
      "Next.js",
      "Node.js",
      "Express.js",
      "RBAC",
      "Razorpay",
      "Push Notifications",
    ],
  },
  {
    title: "Invosmart",
    description:
      "Multi-tenant business finance platform for invoicing, payment tracking and financial analytics. Built with Next.js 16 (App Router), tRPC for end-to-end type-safe APIs, and Drizzle ORM with PostgreSQL. Secure auth with Better Auth, deployed on Vercel.",
    link: "https://invosmart-pi.vercel.app",
    github: "https://github.com/myselfsandip/invosmart",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "tRPC",
      "TanStack Query",
      "Better Auth",
      "Drizzle ORM",
      "PostgreSQL",
    ],
  },
  {
    title: "Meet AI",
    description:
      "AI-powered video meeting SaaS with real-time AI agents for meeting assistance, dynamic summaries, transcripts, playback and AI Q&A. Google OAuth and email login with Passport.js, built on a React frontend, Express backend, Drizzle ORM and Stream.io SDKs. Deployed on AWS.",
    link: "https://meet-ai-lac.vercel.app",
    github: "https://github.com/myselfsandip/meet-ai",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack Query",
      // "Zustand",
      "Express.js",
      "Drizzle ORM",
      "Passport.js",
      "Stream.io",
      "OpenAI",
    ],
  },
  {
    title: "Web Scraper Pro",
    description:
      "Next.js scraping tool with server-side API routes using Cheerio for HTML parsing. Extracts structured data (headings, tables, links, images) and exports it as JSON.",
    link: "https://web-scraper-pro-orcin.vercel.app",
    github: "https://github.com/myselfsandip/web-scraper-pro",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
];

const experience: Job[] = [
  {
    role: "Fullstack Developer",
    company: "Indomitech Global Pvt. Ltd.",
    period: "Apr 2025 - Present",
    points: [
      "Built and maintain REST APIs in Node.js and Express.js for mobile and web clients.",
      "Developed responsive, cross-platform interfaces with React.js and Next.js.",
      "Integrated Firebase push notifications and deep linking for Android and iOS apps.",
      "Combined Google Maps API with Socket.io for real-time tracking, location sharing and distance calculation.",
      "Used OpenAI APIs to generate automated Asset Management Reports.",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "React.js",
      "Next.js",
      "Socket.io",
      "Firebase",
      "Google Maps API",
      "OpenAI",
    ],
  },
];

const dv = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const tools = [
  // Languages
  { logo: `${dv}/javascript/javascript-original.svg`, title: "JavaScript" },
  { logo: `${dv}/typescript/typescript-original.svg`, title: "TypeScript" },
  { logo: `${dv}/python/python-original.svg`, title: "Python" },
  { logo: `${dv}/java/java-original.svg`, title: "Java" },
  {
    logo: "https://res.cloudinary.com/deczqhug9/image/upload/v1756793793/C_Programming_Language.svg_tqk25c.png",
    title: "C",
  },
  { logo: `${dv}/php/php-original.svg`, title: "PHP" },

  // Frontend
  { logo: `${dv}/react/react-original.svg`, title: "React" },
  { logo: `${dv}/nextjs/nextjs-original.svg`, title: "Next.js" },
  { logo: `${dv}/tailwindcss/tailwindcss-original.svg`, title: "Tailwind CSS" },
  // {
  //   logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s",
  //   title: "Zustand",
  // },
  {
    logo: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4",
    title: "TanStack Query",
  },

  // Backend
  { logo: `${dv}/nodejs/nodejs-original.svg`, title: "Node.js" },
  {
    logo: "https://res.cloudinary.com/deczqhug9/image/upload/v1756793706/express_log_h4ihik.png",
    title: "Express.js",
  },
  { logo: `${dv}/socketio/socketio-original.svg`, title: "Socket.io" },

  // Databases & queues
  { logo: `${dv}/mongodb/mongodb-original.svg`, title: "MongoDB" },
  { logo: `${dv}/postgresql/postgresql-original.svg`, title: "PostgreSQL" },
  { logo: `${dv}/redis/redis-original.svg`, title: "Redis" },
  {
    logo: "https://avatars.githubusercontent.com/u/108468352?s=200&v=4",
    title: "Drizzle ORM",
  },
  { logo: `${dv}/rabbitmq/rabbitmq-original.svg`, title: "RabbitMQ" },

  // DevOps
  { logo: `${dv}/git/git-original.svg`, title: "Git" },
  { logo: `${dv}/githubactions/githubactions-original.svg`, title: "GitHub Actions" },
  {
    logo: "https://res.cloudinary.com/deczqhug9/image/upload/v1756794076/docker-logo_enztlc.png",
    title: "Docker",
  },
  { logo: `${dv}/amazonwebservices/amazonwebservices-original-wordmark.svg`, title: "AWS" },
];

/* --------------------------- COMPONENT --------------------------- */

export default function Home() {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const initialProjectCount = 3;
  const visibleProjects = isProjectsExpanded
    ? projects
    : projects.slice(0, initialProjectCount);

  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const initialExperienceCount = 2;
  const visibleExperience = isExperienceExpanded
    ? experience
    : experience.slice(0, initialExperienceCount);

  const handleHeartRain = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const heartShape = confetti.shapeFromText({ text: "🤍", scalar: 2 });

    const rainConfetti = () => {
      confetti({
        particleCount: 3,
        startVelocity: 0,
        ticks: 300,
        gravity: 0.5,
        origin: { x: Math.random(), y: -0.1 },
        shapes: [heartShape],
        scalar: 1.5,
        drift: Math.random() - 0.5,
        colors: ["#ffffff", "#f8fafc", "#f1f5f9"],
      });
    };

    const rainInterval = setInterval(() => {
      if (Date.now() > animationEnd) {
        clearInterval(rainInterval);
        return;
      }
      for (let i = 0; i < 5; i++) {
        setTimeout(() => rainConfetti(), i * 100);
      }
    }, 200);

    for (let i = 0; i < 20; i++) {
      setTimeout(() => rainConfetti(), i * 50);
    }
  };

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 mt-2">
      {/* Spotify + Intro */}
      <AnimateIn variant="fadeUp">
        <section className="mb-3">
          <AnimateIn variant="fadeUp" delay={0.1}>
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-glow-effect">
              <div className="pt-3 px-3 pb-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.479.359-.78.719-.84 4.561-1.021 8.52-.621 11.64 1.32.42.18.479.659.301 1.02l-.238.061zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.481.78.241 1.2zm.120-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Vibing to while I code
                  </h2>
                </div>
              </div>
              <div className="px-2 pb-1">
                <div className="overflow-hidden rounded-lg">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>

        <section className="mb-10">
          <AnimateIn variant="fadeUp" delay={0.2}>
            <h1 className="text-xl font-medium tracking-tight mb-3">
              <span>Hey, I&apos;m Sandip ᯓᡣ𐭩</span>
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.4}>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Backend-focused Full Stack Developer
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mb-5">
              {summary}
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.5}>
            <div className="flex items-center gap-2 mb-5">
              <Tooltip content="Hire me please 🥺">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Resume
                </a>
              </Tooltip>
            </div>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.6}>
            <div className="flex items-center gap-5">
              <SocialMedia />
            </div>
          </AnimateIn>
        </section>
      </AnimateIn>

      {/* Experience */}
      <AnimateIn variant="fadeUp" delay={0.2}>
        <section className="mb-10">
          <AnimateIn variant="reveal" delay={0.25}>
            <h2 className="text-lg font-medium tracking-tight mb-3 inline-block">
              Experience▼
            </h2>
          </AnimateIn>
          <div className="space-y-8">
            <ul className="space-y-8">
              {visibleExperience.map((job, index) => (
                <AnimateIn
                  key={index}
                  variant="fadeLeft"
                  delay={0.3 + index * 0.1}
                >
                  <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                      <h3 className="text-md font-medium">
                        {job.role} at {job.company}
                      </h3>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {job.period}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-zinc-500 dark:text-zinc-400 mb-2 marker:text-zinc-300 dark:marker:text-zinc-600">
                      {job.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs text-zinc-400 dark:text-zinc-500"
                        >
                          {tech}
                          {techIndex < job.technologies.length - 1 ? " /" : ""}
                        </span>
                      ))}
                    </div>
                  </li>
                </AnimateIn>
              ))}
            </ul>
            {experience.length > initialExperienceCount && (
              <button
                onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mx-auto"
              >
                {isExperienceExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More Experience <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </section>
      </AnimateIn>

      {/* Projects */}
      <AnimateIn variant="fadeUp" delay={0.3}>
        <section className="mb-10">
          <AnimateIn variant="reveal" delay={0.35}>
            <h2 className="text-lg font-medium tracking-tight mb-3 inline-block">
              Projects▼
            </h2>
          </AnimateIn>
          <div className="space-y-8">
            <ul className="space-y-8">
              {visibleProjects.map((project, index) => {
                const delay =
                  isProjectsExpanded && index >= initialProjectCount
                    ? 0.35 + (index - initialProjectCount) * 0.1
                    : 0.35 + index * 0.1;
                return (
                  <AnimateIn key={index} variant="fadeLeft" delay={delay}>
                    <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
                      <div className="flex items-baseline justify-between mb-1 gap-3">
                        <h3 className="text-md font-medium">{project.title}</h3>
                        <div className="flex flex-row gap-2 shrink-0">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                              GitHub <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : null}
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs text-zinc-400 dark:text-zinc-500"
                          >
                            {tech}
                            {techIndex < project.technologies.length - 1
                              ? " /"
                              : ""}
                          </span>
                        ))}
                      </div>
                    </li>
                  </AnimateIn>
                );
              })}
            </ul>
            {projects.length > initialProjectCount && (
              <button
                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mx-auto"
              >
                {isProjectsExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More Projects <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </section>
      </AnimateIn>

      {/* Education */}
      <AnimateIn variant="fadeUp" delay={0.4}>
        <section className="mb-10">
          <AnimateIn variant="reveal" delay={0.45}>
            <h2 className="text-lg font-medium tracking-tight mb-3 inline-block">
              Education▼
            </h2>
          </AnimateIn>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <AnimateIn
                key={index}
                variant="fadeLeft"
                delay={0.5 + index * 0.1}
              >
                <div className="group hover:translate-x-1 transition-all duration-300 ease-out">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <h3 className="text-md font-medium">{edu.degree}</h3>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {edu.school}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    {edu.note}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Tools & Stack */}
      <AnimateIn variant="fadeUp" delay={0.6}>
        <section className="mb-10">
          <AnimateIn variant="reveal" delay={0.65}>
            <h2 className="text-lg font-medium tracking-tight mb-3 inline-block">
              Tools & Stack▼
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-y-6 gap-x-12">
            {tools.map(({ logo, title }, index) => (
              <AnimateIn
                key={index}
                variant="scale"
                delay={0.65 + index * 0.03}
              >
                <div className="flex flex-col items-center group">
                  <div className="relative h-6 w-6 sm:h-8 sm:w-8 mb-3 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo}
                      alt={`${title} logo`}
                      className="object-contain drop-shadow-md"
                      loading="eager"
                    />
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap">
                    {title}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Contact */}
      <AnimateIn variant="fadeUp" delay={1.0}>
        <section className="mb-8">
          <AnimateIn variant="reveal" delay={1.05}>
            <div className="text-center">
              <h2 className="text-2xl sm:text-2xl font-bold tracking-tight mb-3">
                Get in Touch
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                DM me on{" "}
                <a
                  href="https://x.com/sandipsingha07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  X (twitter)
                </a>
                {", "}
                <a
                  href="https://www.linkedin.com/in/myselfsandip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  LinkedIn
                </a>
                {" or email "}
                <a
                  href="mailto:sandipsingha714@gmail.com"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  sandipsingha714@gmail.com
                </a>{" "}
                if you want to chat or hire me for a backend, full-stack developer
                or freelance role. No spam, I repeat, no crypto
                pitches :D
              </p>
            </div>
          </AnimateIn>
        </section>
      </AnimateIn>

      {/* Footer */}
      <AnimateIn variant="fadeUp" delay={1.2}>
        <footer className="pt-4 text-xs text-zinc-400 dark:text-zinc-500 flex justify-between items-center relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/4 top-1/2 w-32 h-8 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent dark:via-blue-500/15 blur-sm animate-light-sweep-1"></div>
            <div className="absolute right-1/4 top-1/2 w-28 h-6 -translate-y-1/2 bg-gradient-to-l from-transparent via-purple-400/15 to-transparent dark:via-purple-500/10 blur-sm animate-light-sweep-2"></div>
            <div className="absolute left-1/2 top-1/2 w-64 h-12 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent dark:via-pink-500/8 blur-md animate-light-pulse"></div>
          </div>

          <Link
            href="#"
            className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors flex items-center gap-2 relative z-10"
          >
            myselfsandip.me
          </Link>
          <div
            onClick={handleHeartRain}
            className="cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors select-none hover:scale-105 transform duration-200 relative z-10"
            title="Click for some love rain!"
          >
            Built with <span className="text-lg">♥</span>
          </div>
        </footer>
      </AnimateIn>
    </main>
  );
}