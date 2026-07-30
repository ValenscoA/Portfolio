"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { useEffect, useState } from "react";
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
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
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

function Nav({ openMenu }: { openMenu: () => void }) {
  return (
    <motion.header
      className={styles.navWrap}
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.monogram} href="#top" aria-label="Back to top">
          <span>VA</span><i />
        </a>
        <button className={styles.menuButton} type="button" onClick={openMenu} aria-label="Open menu">
          <span>Menu</span>
          <span className={styles.menuLines} aria-hidden="true"><i /><i /></span>
        </button>
      </nav>
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
            <span className={styles.overlayMark}>VA.</span>
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
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Nav openMenu={() => setMenuOpen(true)} />
      <Menu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

      <section className={styles.hero} aria-labelledby="hero-title">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          Valensco <span>Aurelius</span>
        </motion.h1>
        <motion.div
          className={styles.heroLinks}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.85 }}
        >
          <a href="#contact">Contact</a>
          <a href="/resume" target="_blank" rel="noreferrer">Resume <Arrow diagonal /></a>
        </motion.div>
        <motion.a
          className={styles.scrollCue}
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          aria-label="Scroll to about section"
        >
          <span>Scroll</span><i aria-hidden="true">↓</i>
        </motion.a>
      </section>

      <section className={`${styles.section} ${styles.about}`} id="about" aria-labelledby="about-title">
        <motion.div {...reveal} className={styles.sectionLabel}><span>01</span>About</motion.div>
        <motion.div {...reveal} className={styles.aboutCopy}>
          <h2 id="about-title">I shape digital ideas into clear, useful experiences.</h2>
          <p>My work sits between design and front-end development. I care about strong type, sharp interaction, and the details people feel before they notice.</p>
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
          {projects.map((project) => (
            <motion.article key={project.slug} {...reveal} className={styles.projectCard}>
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
