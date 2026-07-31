"use client";

import Link from "next/link";
import { motion } from "motion/react";
import BrandLogo from "../components/BrandLogo";
import styles from "./project.module.css";

export type Project = {
  number: string;
  title: string;
  discipline: string;
  year: string;
  intro: string;
  challenge: string;
  outcome: string;
  accent: string;
  nextSlug: string;
  nextTitle: string;
};

const enter = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className={styles.page} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className={styles.ambient} aria-hidden="true" />
      <motion.header {...enter} className={styles.nav}>
        <Link href="/" aria-label="Back to portfolio">
          <BrandLogo className={styles.brandLogo} />
        </Link>
        <Link href="/#projects">Close <span aria-hidden="true">×</span></Link>
      </motion.header>

      <section className={styles.hero}>
        <motion.div {...enter} transition={{ ...enter.transition, delay: 0.1 }} className={styles.kicker}>
          <span>{project.number}</span>{project.discipline}<i>{project.year}</i>
        </motion.div>
        <motion.h1 {...enter} transition={{ ...enter.transition, delay: 0.18 }}>{project.title}</motion.h1>
      </section>

      <motion.section
        className={styles.feature}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label={`${project.title} visual`}
      >
        <div className={styles.featureInner}>
          <span>{project.number} / VA</span>
          <b>{project.title}</b>
          <i>Selected work · {project.year}</i>
        </div>
      </motion.section>

      <section className={styles.content}>
        <motion.p {...enter} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>{project.intro}</motion.p>
        <motion.div {...enter} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className={styles.details}>
          <div><span>Context</span><p>{project.challenge}</p></div>
          <div><span>Result</span><p>{project.outcome}</p></div>
        </motion.div>
      </section>

      <section className={styles.next}>
        <span>Next project</span>
        <Link href={`/projects/${project.nextSlug}`}>{project.nextTitle} <i aria-hidden="true">→</i></Link>
      </section>
    </main>
  );
}
