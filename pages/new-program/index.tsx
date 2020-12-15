import { useEffect, useState } from "react";
import Link from "next/link";

import useLocalStorage from "@hooks/useLocalStorage/useLocalStorage";
import Icon from "@components/Icon/Icon";

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
  const [programName, setProgramName] = useState("");
  const [storedValue, setValue] = useLocalStorage("all-programs", []);
  const [isAdded, setAdded] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  console.log(storedValue);

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
      const foundExercise: ProgramExercise = exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      foundExercise.sets = 0;
      foundExercise.reps = 0;

      addExerciseToProgram([...programExercises, foundExercise]);
    } else {
      const filtered = programExercises.filter(
        (exercise) => exercise.id !== exerciseId
      );

      addExerciseToProgram([...filtered]);
    }
  };

  const handleSetReps = (
    e: React.ChangeEvent<HTMLInputElement>,
    exerciseId: number
  ) => {
    const { name, value } = e.target;
    const foundProgramExercise = programExercises.find(
      (pe) => pe.id === exerciseId
    );

    if (name === "sets") {
      foundProgramExercise.sets = Number(value);
    }

    if (name === "reps") {
      foundProgramExercise.reps = Number(value);
    }
  };

  const handleSubmitProgram = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newProgram = {
      programName,
      programExercises,
    };

    setProcessing(true);

    setTimeout(() => {
      Promise.resolve(setValue([...storedValue, newProgram])).then(() => {
        setProcessing(false);
        setAdded(true);
      });
    }, 1500);
  };

  const resetNewProgramPage = (e) => {
    e.preventDefault();
    setProgramName("");
    addExerciseToProgram([]);
    setAdded(false);
  };

  const renderNewProgramForm = () => {
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
          <form className={styles["flex-form"]}>
            <div>
              <label htmlFor="program-name">Program Name</label>
              <input
                type="text"
                name="program-name"
                id="program-name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
              />
            </div>
            <div className={styles["program-exercise-list"]}>
              <h2>Exercises</h2>
              <ul>
                {programExercises?.length ? (
                  programExercises.map((programExercise: ProgramExercise) => (
                    <li className={styles["program-exercise-info"]}>
                      <span>{programExercise.name}</span>
                      <div className={styles["sets-container"]}>
                        <label htmlFor="sets">Sets</label>
                        <input
                          className={styles["sets-input"]}
                          type="number"
                          name="sets"
                          id="sets"
                          onChange={(e) => handleSetReps(e, programExercise.id)}
                        />
                      </div>
                      <div className={styles["reps-container"]}>
                        <label htmlFor="reps">Reps</label>
                        <input
                          className={styles["reps-input"]}
                          type="number"
                          name="reps"
                          id="reps"
                          onChange={(e) => handleSetReps(e, programExercise.id)}
                        />
                      </div>
                    </li>
                  ))
                ) : (
                  <p>
                    Please select one or more exercise from the list to the left
                    side of the form.
                  </p>
                )}
              </ul>
            </div>
            <div>
              <button
                disabled={isProcessing}
                onClick={handleSubmitProgram}
                className={styles.btn}
                type="submit"
              >
                {isProcessing ? renderProcessingDisplay() : "Add Program"}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  };

  const renderSuccessDisplay = () => {
    return (
      <section className={styles["new-program-container-success"]}>
        <div className={styles["return-to-new-program"]}>
          <button
            className={styles["return-new-program-btn"]}
            onClick={resetNewProgramPage}
          >
            Return to New Program
          </button>
        </div>
        <Icon icon="checkmark" fill="green" width="150" height="200" />
        <div className={styles["success-info"]}>
          <p>{programName} has been added!</p>
        </div>
      </section>
    );
  };

  const renderProcessingDisplay = () => {
    return (
      <>
        <span className={`${styles["loader"]} ${styles["loader-bars"]}`}>
          <span></span>
        </span>
        Processing...
      </>
    );
  };

  return <>{isAdded ? renderSuccessDisplay() : renderNewProgramForm()}</>;
};

export default NewProgram;
