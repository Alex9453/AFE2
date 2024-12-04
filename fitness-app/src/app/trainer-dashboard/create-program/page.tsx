"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createWorkoutProgram } from "@/app/api/services/clientService";

interface ValidationErrors {
  name: string;
  description: string;
}

// CreateProgram.tsx
export default function CreateWorkoutProgram() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [programInfo, setProgramInfo] = useState({
    name: "",
    description: "",
    clientId: userId,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    description: "",
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
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProgramInfo({ ...programInfo, [name]: value });

    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = (): boolean => {
    return Object.values(validationErrors).every(error => error === "") &&
           Object.values(programInfo).every(value => value !== "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createWorkoutProgram(programInfo, Number(userId));
      router.back();
    } catch (error) {
      console.error("Failed to create workout program:", error);
    }
  };

  return (
    <div className="dashboard-page">
    <div className="page-container">
      <h1 className="dashboard-title">Create Workout Program</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="E.g., Strength Training"
              value={programInfo.name}
              onChange={handleInputChange}
              required
              className={validationErrors.name ? "error" : ""}
            />
            {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={programInfo.description}
              onChange={handleInputChange}
              required
              className={validationErrors.description ? "error" : ""}
            />
            {validationErrors.description && <span className="error-message">{validationErrors.description}</span>}
          </div>
          <button type="submit" disabled={!isFormValid()}>Create workout program</button>
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