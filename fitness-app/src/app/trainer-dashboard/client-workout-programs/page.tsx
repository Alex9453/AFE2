"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchWorkoutPrograms,
  deleteWorkoutProgram,
} from "@/app/api/services/clientService";

interface Exercise {
  exerciseId: number;
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  time: number;
}

interface WorkoutProgram {
  workoutProgramId: number;
  name: string;
  description: string;
  exercises: Exercise[];
}

export default function ClientWorkoutPrograms() {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();

  useEffect(() => {
    const getWorkoutPrograms = async () => {
      try {
        const data = await fetchWorkoutPrograms(Number(userId));
        setWorkoutPrograms(data);
      } catch (error) {
        console.error("Error when loading workout programs:", error);
      }
    };

    getWorkoutPrograms();
  }, [userId]);

  const handleWorkoutProgramDelete = async (programId: number) => {
    try {
      const success = await deleteWorkoutProgram(programId);
      if (success) {
        setWorkoutPrograms((prevPrograms) =>
          prevPrograms.filter(
            (program) => program.workoutProgramId !== programId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting workout program:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <h1 className="dashboard-title">Client's workout programs</h1>
        {workoutPrograms.length === 0 ? (
          <p>No workout programs available.</p>
        ) : (
          <ul className="workout-program-list">
            {workoutPrograms.map((program) => (
              <li key={program.workoutProgramId} className="workout-program-item">
                <h2 className="workout-program-name">{program.name}</h2>
                <p>{program.description}</p>
                <h3>Exercises:</h3>
                {program.exercises.length === 0 ? (
                  <p>No exercises available.</p>
                ) : (
                  <ul className="exercise-list">
                    {program.exercises.map((exercise) => (
                      <li key={exercise.exerciseId} className="exercise-item">
                        <h4>{exercise.name}</h4>
                        <p>{exercise.description}</p>
                        <p>Sets: {exercise.sets}</p>
                        {exercise.repetitions > 0 && (
                          <p>Repetitions: {exercise.repetitions}</p>
                        )}
                        {exercise.time > 0 && (
                          <p>Time: {exercise.time} seconds</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() =>
                    router.push(
                      `/trainer-dashboard/add-exercise?workoutProgramId=${program.workoutProgramId}`
                    )
                  }
                >
                  Add exercise
                </button>
                <button
                  onClick={() =>
                    handleWorkoutProgramDelete(program.workoutProgramId)
                  }
                >
                  Delete workout program
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}