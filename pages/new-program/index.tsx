import { useEffect, useState } from "react";

import styles from "./new-program.module.css";

interface Exercise {
  id: number;
  name: string;
  target: string;
}

interface ProgramExercise {
  id: number;
  name: string;
  target: string;
  sets: number;
  reps: number;
}

const NewProgram: React.FC = () => {
  const [exercises, setExercises] = useState([]);
  const [programExercises, addExerciseToProgram] = useState([]);

  useEffect(() => {
    import("../../exercises.json").then((data) => {
      setExercises(data.exercises);
    });
  }, [exercises]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    exerciseId: number
  ) => {
    if (e.target.checked) {
      const foundExercise = exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      addExerciseToProgram([...programExercises, foundExercise]);
    } else {
      const filtered = programExercises.filter(
        (exercise) => exercise.id !== exerciseId
      );

      addExerciseToProgram([...filtered]);
    }
  };

  return (
    <section className={styles["new-programs-container"]}>
      <div className={styles["exercise-list"]}>
        {exercises?.map((exercise: Exercise) => (
          <ul>
            <li>
              <label className={styles.checkbox}>
                <input
                  name="exercise"
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, exercise.id)}
                />
                <div>
                  <span>{exercise.name}</span>
                  <span>{exercise.target}</span>
                </div>
              </label>
            </li>
          </ul>
        ))}
      </div>
      <div className={styles["exercise-form"]}>
        <form>
          <div>
            <label htmlFor="program-name">Program Name</label>
            <input type="text" name="program-name" id="program-name" />
          </div>
          <div>
            <h2>Exercises</h2>
            <ul>
              {programExercises?.map((programExercise: ProgramExercise) => (
                <li className={styles["program-exercise-info"]}>
                  <span>{programExercise.name}</span>
                  <div className={styles["sets-container"]}>
                    <label htmlFor="sets">Sets</label>
                    <input
                      className={styles["sets-input"]}
                      type="number"
                      name="sets"
                      id="sets"
                    />
                  </div>
                  <div className={styles["reps-container"]}>
                    <label htmlFor="reps">Reps</label>
                    <input
                      className={styles["reps-input"]}
                      type="number"
                      name="reps"
                      id="reps"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewProgram;
