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
        <h1>Software<br />engineer.</h1>
      </section>
      <div className={styles.grid}>
        <div><span>Profile</span><p>Computer Science student focused on full-stack applications, AI tooling, and developer infrastructure. I build production-minded projects and care about maintainable systems.</p></div>
        <div><span>Core skills</span><p>TypeScript, JavaScript, React, Node.js, Python, Java, SQL, Git, Docker, Linux.</p></div>
        <div><span>Contact</span><a href="mailto:hello@valensco.me">hello@valensco.me</a></div>
        <div><span>Links</span><p><a href="https://github.com/ValenscoA" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/valensco-aurelius-56606b331/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p></div>
      </div>
    </main>
  );
}
