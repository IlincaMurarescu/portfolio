"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BookOpen,
  Bot,
  ChevronDown,
  ChevronUp,
  Cloud,
  Code2,
  Github,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Newspaper,
  Rocket,
  Scale,
  Server,
  Sun,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section =
  | "home"
  | "activities"
  | "career"
  | "education"
  | "languages"
  | "next-steps"
  | "skills"
  | "why-fullstack";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "why-fullstack", label: "Why Fullstack" },
  { id: "career", label: "Career" },
  { id: "skills", label: "Skills" },
  { id: "activities", label: "Extras" },
  { id: "education", label: "Education" },
  { id: "languages", label: "Languages" },
  { id: "next-steps", label: "Next Steps" },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const HACKATHONS = [
  {
    title: "FII Practic Hackathon 2024",
    year: "2024",
    context:
      "Built Timeless Memories, a full-stack web platform for creating and sharing multimedia time capsules.",
    description:
      "Contributed to the frontend development and API integration, implementing user-facing features for creating and managing capsules with text, audio, and video content, authentication flows, public/private sharing, gifting, and delayed access to locked memories.",
    stack: ["React", "Frontend Development", "API Integration", "OAuth"],
    github: "https://github.com/OchianIulian/FII_Practic_Hackathon_2024",
    linkedin: "",
  },
];

const CONFERENCES = [
  {
    title: "DevTalks",
    year: "2024",
    context: "The largest tech conference in Central and Eastern Europe",
    description:
      "Attended talks on frontend concepts, UI/UX principles, product ownership, and AI-assisted development workflows.",
    stack: ["Frontend", "UI/UX", "Product Ownership", "AI"],
    github: "",
    linkedin:
      "https://www.linkedin.com/posts/ilinca-mur%C4%83rescu-213317228_we-had-a-blast-attending-the-11th-edition-activity-7203793625074307072-KFsd?utm_source=share&utm_medium=member_desktop&rcm=ACoAADj_5W8BDWuF8XwkeTnN4KeAoJ1DD0IlrRg",
  },
];

const ACTIVITY_ITEMS = [
  ...HACKATHONS.map((item) => ({
    ...item,
    category: "Hackathon",
    icon: Trophy,
  })),
  ...CONFERENCES.map((item) => ({
    ...item,
    category: "Conference",
    icon: BookOpen,
  })),
];

const VOLUNTEERING: {
  org: string;
  role: string;
  period: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    org: "Association of Computer Science Students Iasi (ASII)",
    role: "Member",
    period: "2020 – 2023",
    description:
      "Contributed to a student-led organization that acts as a bridge between the Computer Science student community, the faculty, and partner companies. Helped support academic, career-oriented, and community events such as conferences, workshops, and student activities.",
    icon: Users,
  },
  {
    org: "The newspaper Ziarul de ASII",
    role: "Writer & Editor",
    period: "2022 – 2023",
    description:
      "Wrote and edited student-focused articles covering faculty events, education,  and community topics for the Computer Science student audience.",
    icon: Newspaper,
  },
];

const CAREER = [
  {
    role: "Junior Data Engineer",
    company: "Amplified Software S.R.L.",
    period: "July 2022 – September 2022",
    type: "Internship",
    current: false,
    description:
      "Developed a posts recommendation system within an application, using machine learning concepts to enhance user experience and engagement.",
    tools: ["Python", "SQL", "Machine Learning"],
  },
  {
    role: "Frontend Intern Developer",
    company: "SABS Innovation",
    period: "April 2025 – May 2025",
    type: "Internship",
    current: false,
    description:
      "Upgraded Angular projects to the latest version, refactored styles for a more consistent user interface, and designed and implemented new features.",
    tools: ["Angular", "SQL", ".NET", "UI Refactoring"],
  },

  {
    role: "Fullstack Developer",
    company: "Rinf Outsourcing Solutions",
    period: "July 2025 – Present",
    type: "Full-time",
    current: true,
    description:
      "Develop, maintain, and optimize website and mobile platforms. Contribute to system architecture and design decisions while improving product usability through user-centered design, testing, and refinement.",
    tools: ["Next.js", "NestJS", "Docker", "UI/UX", "Architecture"],
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. Human-Computer Interaction",
    institution: "University Paris Saclay",
    location: "Paris, France",
    period: "2024 – 2025",
    current: false,
    details:
      "Erasmus Exchange focused on Human-Computer Interaction, user-centered design, and the relationship between technology and user experience.",
  },
  {
    degree: "M.Sc. Software Systems Engineering",
    institution: "Alexandru Ioan Cuza University",
    location: "Iasi, Romania",
    period: "2023 – 2025",
    current: false,
    details:
      "Master studies focused on software systems engineering, strengthening architecture, backend, and full-stack development foundations.",
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "Alexandru Ioan Cuza University",
    location: "Iasi, Romania",
    period: "2020 – 2023",
    current: false,
    details:
      "Bachelor studies in Computer Science, building a strong foundation in programming, databases, algorithms, and software development.",
  },
];

const LANGUAGES = [
  {
    name: "Romanian",
    level: "Native",
    levelCode: "C2",
    certificate: null,
    bars: 5,
    native: true,
  },
  {
    name: "English",
    level: "Proficient",
    levelCode: "C1",
    certificate: "Cambridge Advanced (CAE)",
    bars: 4,
    native: false,
  },
  {
    name: "French",
    level: "Upper Intermediate",
    levelCode: "B2",
    certificate: "DELF B2",
    bars: 3,
    native: false,
  },
];

const NEXT_STEPS = [
  {
    icon: Bot,
    title: "LLM Integration & AI Development",
    description:
      "Exploring how LLMs and AI-powered assistants can be integrated into full-stack applications to create smarter workflows, more intuitive user experiences, and products that deliver real value.",
  },
  {
    icon: Cloud,
    title: "DevOps",
    description:
      "Expanding my deployment and infrastructure knowledge across CI/CD pipelines, containerisation, Kubernetes, cloud resource management, and observability.",
  },
  {
    icon: Handshake,
    title: "Becoming a Mentor",
    description:
      "Gradually working toward teaching and mentoring the next generation of developers through practical guidance, and one-on-one support.",
  },
  {
    icon: UserPlus,
    title: "Design & User Experience",
    description:
      "Investing more time in design thinking, interaction design and accessibility, because great software starts with a great experience.",
  },
];

const SKILLS = {
  Frontend: {
    icon: Code2,
    items: [
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "Tailwind CSS",
      "Radix UI",
    ],
  },
  Backend: {
    icon: Server,
    items: [
      "Node.js",
      "Nest.js",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "REST APIs",
      "Python",
      "Java",
    ],
  },
  Tools: {
    icon: Wrench,
    items: [
      "Git",
      "Docker",
      "Figma",
      "VS Code",
      "Vercel",
      "GitHub Actions",
      "Postman",
      "Jira",
    ],
  },
  "Soft Skills": {
    icon: Heart,
    items: [
      "Clear communication",
      "Async collaboration",
      "Problem decomposition",
      "Technical decision-making",
      "Empathy-driven design",
    ],
  },
};

// ─── Small components ─────────────────────────────────────────────────────────

function LanguageBar({
  filled,
  total = 5,
}: {
  filled: number;
  total?: number;
}) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-7 rounded-full transition-colors ${
            i < filled ? "bg-foreground" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground border border-border/60">
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 space-y-1.5">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground max-w-xl">{subtitle}</p>
      )}
      <div className="mt-3 h-px w-12 bg-accent-foreground/25 rounded-full" />
    </div>
  );
}

function ProjectCard({ item }: { item: (typeof ACTIVITY_ITEMS)[number] }) {
  const [open, setOpen] = useState(false);
  const hasGithub = Boolean(item.github);
  const hasLinkedin = Boolean(item.linkedin);
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3 transition-all duration-200 hover:border-muted-foreground/25 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-secondary p-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <Badge variant="secondary" className="text-[10px]">
                {item.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.year} · {item.context}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasGithub && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {hasLinkedin && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View LinkedIn post"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="text-muted-foreground hover:text-foreground hover:cursor-pointer transition-colors"
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-3 pt-1 pl-11 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          {item.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.stack.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState<Section>("home");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const mostVisible = visibleEntries[0];

        if (mostVisible?.target.id) {
          setActive(mostVisible.target.id as Section);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-96px 0px -45% 0px",
      },
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id: Section) => {
    setActive(id);
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <button
            onClick={() => go("home")}
            className="text-sm font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors"
          >
            Ilinca Murarescu{" "}
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary hover:cursor-pointer"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border/60 bg-background/95 px-5 py-3 md:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active === item.id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-5 py-14 space-y-28">
        {/* ── HOME ──────────────────────────────────────────────────────── */}
        <section
          id="home"
          className="scroll-mt-24 flex justify-center align-center"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            {/* Hero text */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground leading-[1.1]">
                  Ilinca Murarescu
                </h1>

                <p className="text-lg text-muted-foreground font-medium">
                  Fullstack Developer · Iasi, Romania
                </p>

                <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
                  Full-Stack Developer with a background in science and a
                  passion for user-centric design. I build software from
                  scratch, balancing sound architectural decisions with
                  effective UI/UX principles and a continuous improvement
                  mindset.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => go("career")}
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  See my journey <ArrowRight className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => go("why-fullstack")}
                >
                  Why fullstack?
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-1">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/IlincaMurarescu?tab=repositories",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/ilinca-mur%C4%83rescu-213317228/",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:ilinca.murarescu@gmail.com",
                    label: "Email",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Compact stack column */}
            <aside className="mx-auto w-full max-w-90 rounded-3xl lg:mx-0 lg:max-w-67.5">
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
                {[
                  {
                    label: "Frontend",
                    icon: Code2,
                    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
                  },
                  {
                    label: "Backend",
                    icon: Server,
                    tags: ["Node.js", "PostgreSQL", "Prisma", "Python"],
                  },
                  {
                    label: "Tools",
                    icon: Wrench,
                    tags: ["Git", "Docker", "Figma", "Vercel"],
                  },
                ].map(({ label, icon: Icon, tags }) => (
                  <div key={label} className="rounded-2xl bg-secondary/60 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-semibold text-foreground">
                        {label}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ── WHY FULLSTACK ─────────────────────────────────────────────── */}
        <section id="why-fullstack" className="scroll-mt-24">
          <SectionHeader title="Why Fullstack?" />

          <div className="max-w-2xl space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p className="text-base text-foreground font-medium leading-relaxed">
              I see fullstack development as the space where technical
              architecture, product thinking, and human experience come
              together.
            </p>

            <p>
              My academic path took me from Computer Science and Software
              Engineering in Iasi to Human-Computer Interaction in Paris, giving
              me a broad view of IT and a clear direction toward building
              complete, user-centered products. Exploring areas such as
              fullstack development, data systems, AI, visualization, and DevOps
              helped me understand what I enjoy most: connecting technical depth
              with real user needs.
            </p>

            <p>
              I am drawn to fullstack work because it gives me context across
              the whole product, from databases, APIs, and architecture to
              interface behavior, usability, testing, and refinement. For me,
              frontend is the bridge between complex systems and the people who
              use them, where technical decisions become visible, intuitive, and
              meaningful.
            </p>
            <p>
              In practice, I enjoy taking features from concept to delivery,
              contributing to product discussions, and balancing technical
              constraints, scalability, and user expectations. I see fullstack
              development as a way to build with fewer blind spots and make
              better product decisions.
            </p>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                What this looks like in practice
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: Rocket,
                    text: "I can ship a feature solo, end-to-end, without handoffs slowing things down",
                  },
                  {
                    icon: Handshake,
                    text: "I align design, backend, and product perspectives",
                  },
                  {
                    icon: Scale,
                    text: "I think about tradeoffs across code, architecture, and user experience",
                  },
                  {
                    icon: UserCheck,
                    text: "I care deeply about the experience, not just the implementation",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="mt-0.5 rounded-lg bg-secondary p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p>
              For me, full-stack development means being involved across the
              entire product journey, from architecture and implementation to
              refinement, testing, and the final user experience.
            </p>
            <p>
              For me, fullstack development means shaping a product end to end,
              from its technical foundation to the way people understand, use,
              and trust it.
            </p>
          </div>
        </section>

        {/* ── CAREER ────────────────────────────────────────────────────── */}
        <section id="career" className="scroll-mt-24">
          <SectionHeader
            title="Career"
            subtitle="My professional journey, from intern to fullstack developer — in chronological order."
          />

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-3.5 top-4 bottom-4 w-px bg-border"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {[...CAREER].reverse().map((job) => (
                <div
                  key={job.role + job.company}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  <div className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center">
                    <div
                      className={`h-3 w-3 rounded-full border-2 ${
                        job.current
                          ? "bg-foreground border-foreground"
                          : "bg-background border-muted-foreground/50"
                      }`}
                    />
                  </div>

                  <div
                    className={`flex-1 rounded-2xl border bg-card p-5 space-y-3 ${
                      job.current ? "border-foreground/20" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground text-sm">
                            {job.role}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {job.company}
                        </p>
                      </div>

                      <div className="text-right">
                        <Badge variant="secondary" className="text-[11px]">
                          {job.period}
                        </Badge>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {job.type}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {job.tools.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────────────────────── */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeader
            title="Skills"
            subtitle="My technical toolkit and the soft skills that make the difference in collaborative environments."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(SKILLS).map(([category, { icon: Icon, items }]) => (
              <div
                key={category}
                className="rounded-2xl border border-border bg-card p-6 space-y-4 transition-all hover:border-muted-foreground/25 hover:shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg bg-secondary p-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ACTIVITIES ────────────────────────────────────────────────── */}
        <section id="activities" className="scroll-mt-24">
          <SectionHeader
            title="Extras"
            subtitle="A short look at past extracurricular activities, from hackathons and conferences to community work."
          />

          <div className="space-y-3">
            {ACTIVITY_ITEMS.map((item) => (
              <ProjectCard key={`${item.category}-${item.title}`} item={item} />
            ))}

            {VOLUNTEERING.map(({ icon: Icon, ...v }) => (
              <div
                key={v.org}
                className="rounded-2xl border border-border bg-card p-5 space-y-2 transition-all hover:border-muted-foreground/25 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-secondary p-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {v.org}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {v.role} · {v.period}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ─────────────────────────────────────────────────── */}
        <section id="education" className="scroll-mt-24">
          <SectionHeader
            title="Education"
            subtitle="My academic background in computer science and software engineering."
          />

          <div className="space-y-4">
            {EDUCATION.map((ed) => (
              <div
                key={ed.degree}
                className={`rounded-2xl border bg-card p-6 space-y-3 ${
                  ed.current ? "border-foreground/20" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-secondary p-2.5">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {ed.degree}
                        </h3>
                        {ed.current && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-medium text-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
                            In progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ed.institution}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-muted-foreground/70" />
                        <p className="text-xs text-muted-foreground/70">
                          {ed.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary">{ed.period}</Badge>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                  {ed.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LANGUAGES ─────────────────────────────────────────────────── */}
        <section id="languages" className="scroll-mt-24">
          <SectionHeader
            title="Languages"
            subtitle="Languages I speak, along with my CEFR proficiency level and official certifications."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="group rounded-2xl border border-border bg-card p-5 space-y-3 transition-all duration-200 hover:border-muted-foreground/25 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {lang.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang.level}
                    </p>
                  </div>
                  <span className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground">
                    {lang.levelCode}
                  </span>
                </div>

                <LanguageBar filled={lang.bars} />

                <div className="space-y-1.5 pt-0.5">
                  {lang.native && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-3 w-3 text-muted-foreground/60" />
                      <span className="text-xs text-muted-foreground">
                        Native speaker
                      </span>
                    </div>
                  )}
                  {lang.certificate && (
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3 text-muted-foreground/60" />
                      <span className="text-xs text-muted-foreground">
                        {lang.certificate}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CEFR legend */}
          <div className="mt-8 rounded-2xl border border-border bg-muted/50 p-5 space-y-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              CEFR Reference
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-6">
              {[
                { code: "A1 / A2", label: "Beginner · Elementary" },
                { code: "B1 / B2", label: "Intermediate · Upper Intermediate" },
                { code: "C1 / C2", label: "Proficient · Mastery" },
              ].map(({ code, label }) => (
                <div key={code} className="flex items-center gap-2.5">
                  <span className="w-14 shrink-0 text-xs font-semibold text-foreground tabular-nums">
                    {code}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEXT STEPS ────────────────────────────────────────────────── */}
        <section id="next-steps" className="scroll-mt-24">
          <SectionHeader
            title="Next Steps"
            subtitle="Where I want to grow, what I'm actively exploring, and where I see my career heading."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {NEXT_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-card p-6 space-y-3 transition-all duration-200 hover:border-muted-foreground/25 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-secondary p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-foreground text-sm leading-snug">
                        {step.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "I don't see these as separate goals — they connect. Better
              infrastructure knowledge makes me a more self-sufficient
              developer. Deeper AI skills make my products smarter. Better
              design sense makes everything I build more humane. And teaching
              others forces me to truly understand what I know."
            </p>
          </div> */}
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="mt-16 border-t border-border/60 py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ilinca Murarescu
        </p>
      </footer>
    </div>
  );
}
