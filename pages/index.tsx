import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>Navigation</nav>
      <main className={styles.main}>
        <h1 className={styles["main-title"]}>My Fitness</h1>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
