import { useState } from "react";
import styles from "./programs.module.css";

import useLocalStorage from "@hooks/useLocalStorage/useLocalStorage";

const Programs: React.FC = () => {
  const [programs] = useLocalStorage("all-programs", []);

  return (
    <section className={styles.container}>
      {programs.map((program, i) => (
        <div style={{ ["--i" as any]: i }} className={styles["program-item"]}>
          {program.programName}
        </div>
      ))}
    </section>
  );
};

export default Programs;
