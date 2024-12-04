"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addExercise } from "@/app/api/services/clientService";

interface ValidationErrors {
  name: string;
  description: string;
  sets: string;
  repetitions: string;
  time: string;
}

export default function AddExercise() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutProgramId = searchParams.get("workoutProgramId");

  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    sets: 0,
    repetitions: 0,
    time: "",
    workoutProgramId: workoutProgramId,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    description: "",
    sets: "",
    repetitions: "",
    time: "",
  });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (value.length < 2) {
          return "Must be at least 2 characters";
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Only letters and spaces are allowed";
        }
        break;
      case "description":
        if (value.length < 10) {
          return "Description must be at least 10 characters";
        }
        break;
      case "sets":
        if (!/^\d+$/.test(value) || Number(value) < 0) {
          return "Must not be negative and must be a number";
        }
        break;
      case "repetitions":
      case "time":
        const currentReps =
          name === "repetitions" ? Number(value) : exercise.repetitions;
        const currentTime =
          name === "time" ? Number(value) : Number(exercise.time) || 0;

        // Check if at least one between time and repetitions is positive
        if (currentReps === 0 && currentTime === 0) {
          return "At least one of repetitions or time must be greater than 0";
        }
        break;
    }
    return "";
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setExercise({ ...exercise, [name]: value });

    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = (): boolean => {
    return (
      Object.values(validationErrors).every((error) => error === "") &&
      Object.values(exercise).every((value) => value !== "")
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addExercise(exercise, Number(workoutProgramId));
      router.back();
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <h1 className="dashboard-title">Add Exercise</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="E.g., Push-up"
                value={exercise.name}
                onChange={handleInputChange}
                required
                className={validationErrors.name ? "error" : ""}
              />
              {validationErrors.name && (
                <span className="error-message">{validationErrors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={exercise.description}
                onChange={handleInputChange}
                required
                className={validationErrors.description ? "error" : ""}
              />
              {validationErrors.description && (
                <span className="error-message">
                  {validationErrors.description}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="sets">Sets:</label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={exercise.sets}
                onChange={handleInputChange}
                required
                className={validationErrors.sets ? "error" : ""}
              />
              {validationErrors.sets && (
                <span className="error-message">{validationErrors.sets}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="repetitions">Repetitions:</label>
              <input
                type="number"
                id="repetitions"
                name="repetitions"
                value={exercise.repetitions}
                onChange={handleInputChange}
                required
                className={validationErrors.repetitions ? "error" : ""}
              />
              {validationErrors.repetitions && (
                <span className="error-message">
                  {validationErrors.repetitions}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="time">Time (seconds):</label>
              <input
                type="number"
                id="time"
                name="time"
                value={exercise.time}
                onChange={handleInputChange}
                required
                className={validationErrors.time ? "error" : ""}
              />
              {validationErrors.time && (
                <span className="error-message">{validationErrors.time}</span>
              )}
            </div>
            <button type="submit" disabled={!isFormValid()}>
              Add Exercise
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
