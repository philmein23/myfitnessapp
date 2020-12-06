import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>
        <div>
          <h1 className={styles["logo"]}>My Fitness</h1>
        </div>
        <ul className={styles["nav-links"]}>
          <li>Home</li>
          <li>My Schedule</li>
        </ul>
      </nav>
      <main className={styles.main}></main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
