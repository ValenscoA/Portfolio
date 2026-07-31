"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import BrandLogo from "./components/BrandLogo";
import styles from "./page.module.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    slug: "northstar",
    number: "01",
    title: "Northstar",
    type: "Product direction · Interface",
    year: "2026",
    className: styles.northstar,
  },
  {
    slug: "solace",
    number: "02",
    title: "Solace",
    type: "Digital experience · Front-end",
    year: "2025",
    className: styles.solace,
  },
  {
    slug: "noma",
    number: "03",
    title: "Noma Archive",
    type: "Identity · Editorial system",
    year: "2025",
    className: styles.noma,
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-12%" },
  transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const },
};

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
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.header
      className={styles.navbar}
      initial={{ opacity: 0, top: 6 }}
      animate={{ opacity: 1, top: 20 }}
      transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary navigation"
    >
      <a className={styles.monogram} href="#top" aria-label="Back to top">
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

function Menu({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) {
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
                onClick={closeMenu}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>0{index + 1}</span>{item.label}
              </motion.a>
            ))}
          </motion.div>
          <div className={styles.overlayFooter}>
            <span>Based in Indonesia</span>
            <a href="mailto:hello@valensco.dev">hello@valensco.dev</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`${styles.projectVisual} ${project.className}`} aria-hidden="true">
      {project.slug === "northstar" && (
        <div className={styles.uiWindow}>
          <div className={styles.uiTop}><span>NS / 04</span><span>PORTFOLIO</span></div>
          <div className={styles.chart}><i /><i /><i /><i /><i /><i /><i /></div>
          <div className={styles.dataLine}><b>$84,290</b><span>+18.4%</span></div>
        </div>
      )}
      {project.slug === "solace" && (
        <div className={styles.solaceType}><span>Slow days,</span><span>well spent.</span><i>42° 59&apos; N</i></div>
      )}
      {project.slug === "noma" && (
        <div className={styles.archiveGrid}>
          <span>NOMA®</span><b>28</b><i>ARCHIVE / 2025</i><em>Objects, images, notes</em>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <main id="top" className={styles.page}>
      <AmbientBackground />
      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />

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
          <a href="#contact">Contact</a>
          <a href="/resume" target="_blank" rel="noreferrer">Resume <Arrow diagonal /></a>
        </motion.div>
      </section>

      <section className={`${styles.section} ${styles.about}`} id="about" aria-labelledby="about-title">
        <motion.div {...reveal} className={styles.sectionLabel}><span>01</span>About</motion.div>
        <motion.div {...reveal} className={styles.aboutCopy}>
          <h2 id="about-title">I turn digital ideas into clear, useful experiences.</h2>
          <p>Design and front-end, handled as one craft.</p>
        </motion.div>
        <motion.div {...reveal} className={styles.aboutMeta}>
          <span>Independent designer &amp; developer</span>
          <span>Indonesia · Available worldwide</span>
        </motion.div>
      </section>

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
              <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project`}>
                <ProjectVisual project={project} />
                <div className={styles.projectInfo}>
                  <div><span>{project.number}</span><h3>{project.title}</h3></div>
                  <p>{project.type}</p>
                  <div className={styles.projectYear}>{project.year}<Arrow /></div>
                </div>
              </Link>
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
          <p>Have something worth making?</p>
          <h2 id="contact-title"><a href="mailto:hello@valensco.dev">Let&apos;s talk.<Arrow diagonal /></a></h2>
        </motion.div>
        <motion.footer {...reveal} className={styles.footer}>
          <span>© {new Date().getFullYear()} Valensco Aurelius</span>
          <div>
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="/resume" target="_blank" rel="noreferrer">Resume</a>
          </div>
          <a href="#top">Back to top ↑</a>
        </motion.footer>
      </section>
    </main>
  );
}
