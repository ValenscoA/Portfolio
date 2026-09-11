"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectMedia as ProjectMediaItem } from "../data/projects";
import styles from "./projectMedia.module.css";

type ProjectMediaProps = {
  media: ProjectMediaItem[];
  title: string;
  className?: string;
};

export default function ProjectMedia({ media, title, className }: ProjectMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (media.length === 0) {
    return (
      <div className={styles.placeholder} role="img" aria-label={`${title} screenshots coming soon`}>
        <span>{title}</span>
        <b>Screenshots coming soon</b>
      </div>
    );
  }

  const active = media[Math.min(activeIndex, media.length - 1)];

  return (
    <div className={`${styles.media} ${className ?? ""}`}>
      <Image
        className={styles.image}
        src={active.src}
        alt={active.alt}
        width={active.width}
        height={active.height}
        sizes="(max-width: 900px) 92vw, 82vw"
      />
      {media.length > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label={`${title} screenshots`}>
          {media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show screenshot ${index + 1} of ${media.length}`}
              className={index === activeIndex ? styles.thumbActive : styles.thumb}
              onClick={() => setActiveIndex(index)}
            >
              <Image src={item.src} alt="" width={item.width} height={item.height} sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
