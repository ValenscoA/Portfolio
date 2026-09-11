"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import Lenis from "lenis";
import {
  type Dispatch,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import BrandLogo from "./components/BrandLogo";
import styles from "./page.module.css";

const resumeUrl = "https://valensco.me/resume.pdf";

const navItems = [
  { label: "About", href: "#about", external: false },
  { label: "Projects", href: "#projects", external: false },
  { label: "Skills", href: "#skills", external: false },
  { label: "Contact", href: "#contact", external: false },
  { label: "Resume", href: resumeUrl, external: true },
] as const;

const projects = [
  {
    slug: "relay",
    number: "01",
    title: "Relay",
    type: "Desktop AI workspace · Full stack",
    year: "2026",
    className: styles.relay,
    sourceUrl: "https://github.com/ValenscoA/relay-ai",
    caseStudyUrl: "/projects/relay",
  },
];

const terminalCommands: Record<string, string[]> = {
  whoami: ["Valensco Aurelius", "Computer Science student · Software engineer"],
  location: ["Malaysia · UTC+8"],
  focus: ["Software engineering", "Interface design", "Embedded systems"],
  now: ["Building production-minded projects.", "Learning new technologies.", "Open to internship opportunities."],
  contact: ["hello@valensco.me", "github.com/ValenscoA"],
  help: ["Available commands: whoami, location, focus, now, contact, clear"],
};

const terminalHistoryLimit = 3;

const technologies = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "SQL",
  "Git",
  "Docker",
  "Linux",
  "Arduino",
  "Raspberry Pi",
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-12%" },
  transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const },
};

function smoothScrollTo(event: ReactMouseEvent<HTMLAnchorElement>, href: string) {
  event.preventDefault();
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
  const offset = (navbar?.getBoundingClientRect().bottom ?? 0) + 20;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.history.pushState(null, "", href);
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  if (diagonal) {
    return (
      <svg
        className={styles.externalIcon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    );
  }

  return <span aria-hidden="true">→</span>;
}

function AmbientBackground() {
  return (
    <motion.div
      className={styles.ambient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div className={styles.grain} />
    </motion.div>
  );
}

function Nav({
  isMenuOpen,
  setIsMenuOpen,
  onNavigate,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  onNavigate: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <motion.header
      className={styles.navbar}
      initial={{ opacity: 0, top: 6 }}
      animate={{ opacity: 1, top: 20 }}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary navigation"
      data-site-navbar
    >
      <a className={styles.monogram} href="#top" onClick={(event) => onNavigate(event, "#top")} aria-label="Go to hero section">
        <BrandLogo className={styles.brandLogo} priority />
      </a>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
      >
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
        <span className={styles.menuLines} aria-hidden="true"><i /><i /></span>
      </button>
    </motion.header>
  );
}

function Menu({
  isOpen,
  closeMenu,
  activeSection,
  onNavigate,
}: {
  isOpen: boolean;
  closeMenu: () => void;
  activeSection: string;
  onNavigate: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMenu]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="site-menu"
          className={styles.menuOverlay}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.45 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className={styles.overlayTop}>
            <BrandLogo className={styles.brandLogo} />
            <button type="button" onClick={closeMenu} className={styles.closeButton} aria-label="Close menu">
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <motion.div
            className={styles.menuLinks}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={!item.external && activeSection === item.href.slice(1) ? styles.activeNavItem : undefined}
                aria-current={!item.external && activeSection === item.href.slice(1) ? "location" : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={item.external ? closeMenu : (event) => {
                  closeMenu();
                  onNavigate(event, item.href);
                }}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>0{index + 1}</span>{item.label}
              </motion.a>
            ))}
          </motion.div>
          <div className={styles.overlayFooter}>
            <span>Based in Malaysia</span>
            <a href="mailto:hello@valensco.me">hello@valensco.me</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`${styles.projectVisual} ${project.className}`} aria-hidden="true">
      <Image
        className={styles.relayScreenshot}
        src="/images/projects/relay-chat.png"
        alt=""
        width={2559}
        height={1503}
        sizes="(max-width: 900px) 92vw, 82vw"
      />
    </div>
  );
}

function AboutSection() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([
    { command: "whoami", output: terminalCommands.whoami },
    { command: "help", output: terminalCommands.help },
  ]);

  function executeCommand(rawCommand: string) {
    const value = rawCommand.trim().toLowerCase();
    if (!value) return;
    if (value === "clear") {
      setHistory([]);
    } else {
      setHistory((current) =>
        [
          ...current,
          {
            command: value,
            output: terminalCommands[value] ?? [`Command not found: ${value}`, "Type 'help' to see available commands."],
          },
        ].slice(-terminalHistoryLimit),
      );
    }
    setCommand("");
  }

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    executeCommand(command);
  }

  return (
    <section
      className={`${styles.section} ${styles.aboutTerminalSection}`}
      id="about"
      aria-labelledby="about-title"
    >
      <motion.div {...reveal} className={styles.aboutTerminalIntro}>
        <div className={styles.sectionLabel}><span>01</span>About</div>
        <h2 id="about-title">Get to know me.</h2>
        <p>Skip the polished bio. Ask the terminal.</p>
      </motion.div>

      <motion.div {...reveal} className={styles.terminalWindow}>
        <div className={styles.terminalBar}>
          <div aria-hidden="true"><i /><i /><i /></div>
          <span>valensco@portfolio:~</span>
          <span>bash</span>
        </div>
        <div className={styles.terminalBody} aria-live="polite">
          <p className={styles.terminalBoot}>Valensco OS 1.0.0 — portfolio shell</p>
          {history.map((entry, index) => (
            <div className={styles.terminalEntry} key={`${entry.command}-${index}`}>
              <p><span>visitor@portfolio</span>:<b>~</b>$ {entry.command}</p>
              {entry.output.map((line) => <p key={line}>{line}</p>)}
            </div>
          ))}
          <form className={styles.terminalPrompt} onSubmit={runCommand}>
            <label htmlFor="about-command"><span>visitor@portfolio</span>:<b>~</b>$</label>
            <input
              id="about-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label="Enter an About command"
            />
            <span className={styles.terminalCursor} aria-hidden="true" />
          </form>
          <div className={styles.terminalShortcuts} aria-label="Quick commands">
            {Object.keys(terminalCommands).filter((item) => item !== "help").map((item) => (
              <button key={item} type="button" onClick={() => executeCommand(item)}>{item}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TechnologyList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.marqueeList} aria-hidden={hidden || undefined}>
      {technologies.map((technology) => <li key={technology}>{technology}</li>)}
    </ul>
  );
}

function TechnologyMarquee() {
  return (
    <section
      className={`${styles.section} ${styles.technologies}`}
      id="technologies"
      aria-labelledby="technologies-title"
    >
      <motion.div {...reveal} className={styles.technologyLabel}>
        <h2 id="technologies-title"><span>02</span>Skills</h2>
      </motion.div>

      <motion.div
        {...reveal}
        className={styles.marquee}
      >
        <ul className={styles.srOnly}>
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className={styles.marqueeViewport} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            <TechnologyList hidden />
            <TechnologyList hidden />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const handleNavigate = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    smoothScrollTo(event, href);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "about", "projects", "skills", "contact"];
    const updateActiveSection = () => {
      const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
      const marker = (navbar?.getBoundingClientRect().bottom ?? 0) + window.innerHeight * 0.22;
      let current = "top";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = "contact";
      setActiveSection((previous) => previous === current ? previous : current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <main id="top" className={styles.page}>
      <AmbientBackground />
      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onNavigate={handleNavigate} />
      <Menu
        isOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <section className={styles.hero} aria-labelledby="hero-title">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.firstName}>Valensco</span><span>Aurelius</span>
        </motion.h1>
        <motion.div
          className={styles.heroLinks}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#contact" onClick={(event) => handleNavigate(event, "#contact")}>Contact</a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume <Arrow diagonal /></a>
        </motion.div>
      </section>

      <AboutSection />

      <TechnologyMarquee />

      <section className={`${styles.section} ${styles.projects}`} id="projects" aria-labelledby="projects-title">
        <motion.div {...reveal} className={styles.sectionHead}>
          <div className={styles.sectionLabel}><span>02</span>Selected work</div>
          <h2 id="projects-title">Built with intent.</h2>
        </motion.div>
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.06 }}
              className={styles.projectCard}
            >
              <Link href={project.caseStudyUrl} aria-label={`View ${project.title} case study`}>
                <ProjectVisual project={project} />
              </Link>
              <div className={styles.projectInfo}>
                <div><span>{project.number}</span><h3><Link href={project.caseStudyUrl}>{project.title}</Link></h3></div>
                <p>{project.type}</p>
                <div className={styles.projectActions}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Source Code</a>
                  <Link href={project.caseStudyUrl}>Case Study</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.skills}`} id="skills" aria-labelledby="skills-title">
        <motion.div {...reveal} className={styles.sectionLabel}><span>03</span>Capabilities</motion.div>
        <motion.div {...reveal} className={styles.skillsLayout}>
          <h2 id="skills-title">The tools change.<br />The standard doesn&apos;t.</h2>
          <div className={styles.skillColumns}>
            <div><span>Build</span><p>React</p><p>TypeScript</p><p>Next.js</p><p>Node.js</p></div>
            <div><span>Design</span><p>Figma</p><p>Interaction</p><p>Design systems</p><p>Prototyping</p></div>
            <div><span>Motion</span><p>Motion</p><p>GSAP</p><p>WebGL</p><p>Lenis</p></div>
          </div>
        </motion.div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
        <motion.div {...reveal} className={styles.sectionLabel}><span>04</span>Contact</motion.div>
        <motion.div {...reveal} className={styles.contactMain}>
          <h2 id="contact-title">Let&apos;s build something together.</h2>
          <p>I&apos;m always open to internship opportunities, collaborations, and interesting projects. Feel free to reach out.</p>
          <div className={styles.contactLinks} aria-label="Contact links">
            <a href="mailto:hello@valensco.me">hello@valensco.me</a>
            <a href="https://github.com/ValenscoA" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/REPLACE_WITH_USERNAME" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://valensco.me" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </motion.div>
        <motion.footer {...reveal} className={styles.footer}>
          <span>Valensco Aurelius<br />© 2026 Valensco Aurelius.<br />Built with Next.js, Motion and TypeScript.</span>
          <div>
            <a href="https://github.com/ValenscoA" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/REPLACE_WITH_USERNAME" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hello@valensco.me">Email</a>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
          <a href="#top" onClick={(event) => handleNavigate(event, "#top")}>Back to top ↑</a>
        </motion.footer>
      </section>
    </main>
  );
}
