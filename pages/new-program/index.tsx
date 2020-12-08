import { useEffect, useState } from "react";

import styles from "./new-program.module.css";

interface Exercise {
  name: string;
  target: string;
}

const NewProgram: React.FC = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    import("../../exercises.json").then((data) => {
      setExercises(data.exercises);
    });
  }, [exercises]);

  return (
    <section className={styles["new-programs-container"]}>
      <div className={styles["exercise-list"]}>
        {exercises?.map((exercise: Exercise) => (
          <ul>
            <li>{exercise.name}</li>
            <li>{exercise.target}</li>
          </ul>
        ))}
      </div>
      <div className={styles["exercise-form"]}>
        <form>
          <div>
            <label htmlFor="program-name">Program Name</label>
            <input type="text" name="program-name" id="program-name" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewProgram;
