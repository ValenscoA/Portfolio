"use client";

import Link from "next/link";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import Lenis from "lenis";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
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

const aboutCards = [
  {
    label: "ABOUT",
    lines: ["Computer Science student passionate about building useful software and hardware."],
  },
  {
    label: "LOCATION",
    lines: ["Based in Malaysia."],
  },
  {
    label: "FOCUS",
    lines: ["Software Engineering", "UI Design", "Embedded Systems"],
  },
  {
    label: "CURRENTLY",
    lines: ["Building projects.", "Learning new technologies.", "Preparing for internships."],
  },
];

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

const SCROLL_THRESHOLD = 70;
const ANIMATION_DURATION = 600;
const WHEEL_IDLE_DURATION = 180;
const MIN_WHEEL_DELTA = 1;
const FLIP_HALF_DURATION = ANIMATION_DURATION / 2000;

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

function CardArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "previous" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

type FlipPhase = "IDLE" | "FLIPPING" | "SETTLING";

function IdentityCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardIndexRef = useRef(0);
  const phaseRef = useRef<FlipPhase>("IDLE");
  const touchStartY = useRef<number | null>(null);
  const accumulatedDelta = useRef(0);
  const wheelGestureConsumed = useRef(false);
  const wheelIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cardScope, animateCard] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  const [cardIndex, setCardIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [flipPhase, setFlipPhase] = useState<FlipPhase>("IDLE");

  const updatePhase = useCallback((nextPhase: FlipPhase) => {
    phaseRef.current = nextPhase;
    setFlipPhase(nextPhase);
  }, []);

  const runFlip = useCallback(async (step: number) => {
    if (phaseRef.current !== "IDLE") return false;

    const nextIndex = Math.min(
      aboutCards.length - 1,
      Math.max(0, cardIndexRef.current + step),
    );
    if (nextIndex === cardIndexRef.current) return false;

    updatePhase("FLIPPING");

    try {
      if (prefersReducedMotion) {
        await animateCard(cardScope.current, { opacity: 0 }, {
          duration: 0.16,
          ease: "easeOut",
        });
      } else {
        await animateCard(cardScope.current, {
          opacity: 0.84,
          rotateX: step > 0 ? -90 : 90,
        }, {
          duration: FLIP_HALF_DURATION,
          ease: [0.22, 1, 0.36, 1],
        });
      }

      flushSync(() => {
        cardIndexRef.current = nextIndex;
        setCardIndex(nextIndex);
      });

      await animateCard(cardScope.current, prefersReducedMotion
        ? { opacity: 0, rotateX: 0 }
        : { opacity: 0.84, rotateX: step > 0 ? 90 : -90 }, {
        duration: 0,
      });

      updatePhase("SETTLING");

      await animateCard(cardScope.current, { opacity: 1, rotateX: 0 }, {
        duration: prefersReducedMotion ? 0.16 : FLIP_HALF_DURATION,
        ease: [0.22, 1, 0.36, 1],
      });

      setProgressIndex(nextIndex);
      return true;
    } finally {
      await animateCard(cardScope.current, { opacity: 1, rotateX: 0 }, { duration: 0 });
      accumulatedDelta.current = 0;
      updatePhase("IDLE");
    }
  }, [animateCard, cardScope, prefersReducedMotion, updatePhase]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const markWheelActivity = () => {
      if (wheelIdleTimer.current) clearTimeout(wheelIdleTimer.current);
      wheelIdleTimer.current = setTimeout(() => {
        accumulatedDelta.current = 0;
        wheelGestureConsumed.current = false;
      }, WHEEL_IDLE_DURATION);
    };

    const onWheel = (event: WheelEvent) => {
      const bounds = section.getBoundingClientRect();
      const isActive = bounds.top < window.innerHeight * 0.75
        && bounds.bottom > window.innerHeight * 0.25;

      if (!isActive) return;

      if (phaseRef.current !== "IDLE") {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (event.deltaY <= 0) {
        accumulatedDelta.current = 0;
        return;
      }

      if (cardIndexRef.current >= aboutCards.length - 1) {
        accumulatedDelta.current = 0;
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (event.deltaY < MIN_WHEEL_DELTA) return;

      markWheelActivity();
      if (wheelGestureConsumed.current) return;

      accumulatedDelta.current += event.deltaY;
      if (accumulatedDelta.current < SCROLL_THRESHOLD) return;

      accumulatedDelta.current = 0;
      wheelGestureConsumed.current = true;
      void runFlip(1);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
      if (wheelIdleTimer.current) clearTimeout(wheelIdleTimer.current);
    };
  }, [runFlip]);

  const activeCard = aboutCards[cardIndex];
  const isBusy = flipPhase !== "IDLE";

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.about}`}
      id="about"
      aria-labelledby="about-title"
    >
      <motion.div {...reveal} className={styles.aboutIntro}>
        <div className={styles.sectionLabel}><span>01</span>About</div>
        <h2 id="about-title">A little about me.</h2>
        <p>I enjoy turning ideas into thoughtful products that work in the real world.</p>
      </motion.div>

      <motion.div {...reveal} className={styles.identityStage}>
        <div
          className={styles.identityCard}
          aria-busy={isBusy}
          onTouchStart={(event) => {
            if (phaseRef.current !== "IDLE") return;
            touchStartY.current = event.touches[0]?.clientY ?? null;
          }}
          onTouchCancel={() => {
            touchStartY.current = null;
          }}
          onTouchEnd={(event) => {
            if (phaseRef.current !== "IDLE" || touchStartY.current === null) return;
            const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
            const forwardDistance = touchStartY.current - endY;
            touchStartY.current = null;
            if (forwardDistance >= 44) void runFlip(1);
          }}
        >
          <motion.article
            ref={cardScope}
            className={styles.identityFace}
            initial={false}
            style={{ rotateX: 0 }}
            aria-live="polite"
          >
            <header>
              <span>{activeCard.label}</span>
              <span>{cardIndex + 1} / {aboutCards.length}</span>
            </header>
            <div className={styles.identityContent}>
              {activeCard.lines.map((line) => <p key={line}>{line}</p>)}
            </div>
            <span className={styles.cardHint}>Scroll or swipe</span>
          </motion.article>
        </div>

        <div className={styles.cardNavigation}>
          <button
            type="button"
            onClick={() => void runFlip(-1)}
            disabled={isBusy || cardIndex === 0}
            aria-label="Show previous identity card"
          >
            <CardArrow direction="previous" />
          </button>
          <div className={styles.cardProgress} aria-label={`Card ${progressIndex + 1} of ${aboutCards.length}`}>
            {aboutCards.map((card, index) => (
              <span key={card.label} className={index === progressIndex ? styles.activeProgress : undefined} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => void runFlip(1)}
            disabled={isBusy || cardIndex === aboutCards.length - 1}
            aria-label="Show next identity card"
          >
            <CardArrow direction="next" />
          </button>
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
        tabIndex={0}
        aria-label="Technologies marquee. Focus to pause the animation."
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

      <IdentityCard />

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
