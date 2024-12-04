"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../api/services/clientService";

export default function CreateTrainer() {
  const [trainerInfo, setTrainerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTrainerInfo({ ...trainerInfo, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser(trainerInfo, "PersonalTrainer");
      alert("Personal Trainer created successfully");
      setTrainerInfo({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error: any) {
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h1 className="dashboard-title">Create Personal Trainer</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Fx Jane"
              value={trainerInfo.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Fx Doe"
              value={trainerInfo.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Fx jd_w@fit.dk"
              value={trainerInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a secure password"
              value={trainerInfo.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}