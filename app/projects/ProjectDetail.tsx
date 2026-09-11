"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import BrandLogo from "../components/BrandLogo";
import ProjectMedia from "../components/ProjectMedia";
import type { ProjectDetailData } from "../data/projects";
import styles from "./project.module.css";

const enter = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function ArchitectureDiagram({ architecture, title }: { architecture: NonNullable<ProjectDetailData["architecture"]>; title: string }) {
  return (
    <figure className={styles.architecture}>
      <div className={styles.architectureStack} aria-label={`${title} architecture`}>
        {architecture.layers.map((layer, index) => (
          <div key={layer.label} className={styles.architectureItem}>
            <div className={styles.architectureLayer}>
              <b>{layer.label}</b>
              {layer.detail && <span>{layer.detail}</span>}
            </div>
            {index < architecture.layers.length - 1 && (
              <span className={styles.architectureArrow} aria-hidden="true">↓</span>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        {architecture.caption}
        {architecture.note && <span className={styles.architectureNote}>{architecture.note}</span>}
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail({ project }: { project: ProjectDetailData }) {
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
          <span>{project.number}</span>{project.discipline}<i>{project.status.label}{project.status.year ? ` · ${project.status.year}` : ""}</i>
        </motion.div>
        <motion.h1 {...enter} transition={{ ...enter.transition, delay: 0.18 }}>{project.title}</motion.h1>
        <motion.p {...enter} transition={{ ...enter.transition, delay: 0.26 }} className={styles.heroSummary}>
          {project.summary}
        </motion.p>
      </section>

      <motion.section
        className={styles.feature}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-label={`${project.title} visual`}
      >
        {project.media.length > 0 ? (
          <ProjectMedia media={project.media} title={project.title} className={styles.featureMedia} />
        ) : project.logoSrc ? (
          <Image
            className={styles.featureLogo}
            src={project.logoSrc}
            alt={`${project.title} logo`}
            width={512}
            height={512}
          />
        ) : (
          <b className={styles.featureWordmark}>{project.title}</b>
        )}
      </motion.section>

      <section className={styles.content}>
        <motion.p
          {...enter}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className={styles.overview}
        >
          {project.overview}
        </motion.p>

        {project.technologies.length > 0 && (
          <motion.ul
            {...enter}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className={styles.techList}
            aria-label={`${project.title} technologies`}
          >
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </motion.ul>
        )}
      </section>

      <section className={styles.sections} aria-label={`${project.title} case study`}>
        {project.sections.map((section) => (
          <motion.article key={section.id} {...enter} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className={styles.sectionBlock}>
            <h2>{section.title}</h2>
            {section.body.length > 0 ? (
              section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p className={styles.sectionTodo}>
                {/* TODO(content): this section is intentionally empty. Add your own notes here. */}
                Content to be added.
              </p>
            )}
          </motion.article>
        ))}
      </section>

      {project.architecture && (
        <motion.section {...enter} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className={styles.architectureSection}>
          <h2>Architecture</h2>
          <ArchitectureDiagram architecture={project.architecture} title={project.title} />
        </motion.section>
      )}

      {project.links.length > 0 && (
        <section className={styles.links} aria-label={`${project.title} links`}>
          <span>Links</span>
          <div>
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>
      )}

      {project.nextSlug && project.nextTitle && (
        <section className={styles.next}>
          <span>Next project</span>
          <Link href={`/projects/${project.nextSlug}`}>{project.nextTitle} <i aria-hidden="true">→</i></Link>
        </section>
      )}
    </main>
  );
}
