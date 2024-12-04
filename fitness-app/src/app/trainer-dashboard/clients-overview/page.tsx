"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClients } from "@/app/api/services/clientService";

interface Client {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  personalTrainerId: number;
}

export default function ClientsOverview() {
  const [clients, setClients] = useState<Client[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error loading clients:", error);
      }
    };

    getClients();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <h1 className="dashboard-title">Clients</h1>
        <ul className="client-list">
          {clients.map((client) => (
            <li key={client.userId} className="client-item">
              <h4>
                {client.firstName} {client.lastName}
              </h4>
              <p>{client.email}</p>
              <button
                onClick={() =>
                  router.push(
                    `/trainer-dashboard/create-program?userId=${client.userId}`
                  )
                }
              >
                Create workout program
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/trainer-dashboard/client-workout-programs?userId=${client.userId}`
                  )
                }
              >
                See workout programs
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
