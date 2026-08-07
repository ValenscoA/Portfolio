import Link from "next/link";
import BrandLogo from "../components/BrandLogo";
import styles from "./resume.module.css";

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header>
        <Link href="/" aria-label="Back to portfolio">
          <BrandLogo className={styles.brandLogo} />
        </Link>
        <Link href="/">Back home</Link>
      </header>
      <section>
        <p>Valensco Aurelius</p>
        <h1>Designer &amp;<br />front-end developer.</h1>
      </section>
      <div className={styles.grid}>
        <div><span>Profile</span><p>I design and build focused digital products, with an eye for typography, interaction, and maintainable front-end systems.</p></div>
        <div><span>Core skills</span><p>React, TypeScript, Next.js, interaction design, prototyping, motion, design systems.</p></div>
        <div><span>Contact</span><a href="mailto:hello@valensco.me">hello@valensco.me</a></div>
        <div><span>Links</span><p><a href="https://github.com/ValenscoA" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://linkedin.com/in/REPLACE_WITH_USERNAME" target="_blank" rel="noopener noreferrer">LinkedIn</a></p></div>
      </div>
    </main>
  );
}
