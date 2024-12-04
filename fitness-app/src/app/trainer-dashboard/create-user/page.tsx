"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../api/services/clientService";

interface ValidationErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function CreateClient() {
  const [clientInfo, setClientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.length < 2) {
          return "Must be at least 2 characters";
        }
        if (!/^[A-Za-z]+$/.test(value)) {
          return "Only letters are allowed";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email format";
        }
        break;
      case "password":
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
          return "Password must contain uppercase, lowercase and numbers";
        }
        break;
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClientInfo({ ...clientInfo, [name]: value });

    const error = validateField(name, value);
    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = (): boolean => {
    return Object.values(validationErrors).every(error => error === "") &&
           Object.values(clientInfo).every(value => value !== "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser(clientInfo, "Client");
      alert("Client created successfully");
      setClientInfo({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error: any) {
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h1 className="dashboard-title">Create Client</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Fx John"
              value={clientInfo.firstName}
              onChange={handleInputChange}
              required
              className={validationErrors.firstName ? "error" : ""}
            />
            {validationErrors.firstName && <span className="error-message">{validationErrors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Fx Doe"
              value={clientInfo.lastName}
              onChange={handleInputChange}
              required
              className={validationErrors.lastName ? "error" : ""}
            />
            {validationErrors.lastName && <span className="error-message">{validationErrors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Fx. jd_c1@fit.dk"
              value={clientInfo.email}
              onChange={handleInputChange}
              required
              className={validationErrors.email ? "error" : ""}
            />
            {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a secure password"
              value={clientInfo.password}
              onChange={handleInputChange}
              required
              className={validationErrors.password ? "error" : ""}
            />
            {validationErrors.password && <span className="error-message">{validationErrors.password}</span>}
          </div>

          <div className="button-group">
            <button type="submit" disabled={!isFormValid()}>Create</button>
            <button
              type="button"
              className="cancel"
              onClick={() => router.push("/trainer-dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}