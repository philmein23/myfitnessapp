import Head from "next/head";
import Link from "next/link";

import styles from "./Layout.module.css";

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Fitness</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>
        <div>
          <Link href="/">
            <h1 className={styles["logo"]}>My Fitness</h1>
          </Link>
        </div>
        <ul className={styles["nav-links"]}>
          <li>
            <Link href="/programs">Programs</Link>
          </li>
          <li>
            <Link href="/new-program">New Program</Link>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default Layout;
