"use server";

import { cookies } from 'next/headers';

export const createClient = async (clientInfo: any) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch("https://swafe24fitness.azurewebsites.net/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(clientInfo),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error creating client:", response.statusText);
      throw new Error("Der opstop en fejl under oprettelse af klient :(");
    }
  } catch (error) {
    console.error("Fejl ved oprettelse af klient:", error);
    throw error;
  }
};

export const fetchClients = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch("https://swafe24fitness.azurewebsites.net/api/Users/Clients", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching clients:", response.statusText);
      throw new Error("Der opstop en fejl under indlæsning af klienter :(");
    }
  } catch (error) {
    console.error("Fejl ved indlæsning af klienter:", error);
    throw error;
  }
};

export const fetchWorkoutPrograms = async ( clientId: number) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch(`https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/client/${clientId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching workout programs:", response.statusText);
      throw new Error("Der opstop en fejl under indlæsning af træningsprogrammer :(");
    }
  } catch (error) {
    console.error("Fejl ved indlæsning af træningsprogrammer:", error);
    throw error;
  }
};

export const createWorkoutProgram = async (programInfo: any, userId: number) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch("https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...programInfo,
        userId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error creating workout program:", response.statusText);
      throw new Error("Der opstop en fejl under oprettelse af træningsprogram :(");
    }
  } catch (error) {
    console.error("Fejl ved oprettelse af træningsprogram:", error);
    throw error;
  }
};

export const deleteWorkoutProgram = async (programId: number) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch(`https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/${programId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      console.error("Error deleting workout program:", response.statusText, errorText);
      throw new Error("Der opstop en fejl under sletning af træningsprogram :(");
    }
  } catch (error) {
    console.error("Fejl ved sletning af træningsprogram:", error);
    throw error;
  }
};

export const addExercise = async (exerciseData: any, programId: number) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('jwt')?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch(`https://swafe24fitness.azurewebsites.net/api/Exercises/Program/${programId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        ...exerciseData,
        programId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error adding exercise:", response.statusText);
      throw new Error("Der opstop en fejl under oprettelse af øvelse :(");
    }
  } catch (error) {
    console.error("Fejl ved oprettelse af øvelse:", error);
    throw error;
  }
};

export const createUser = async (userInfo: any, accountType: "Client" | "PersonalTrainer") => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("jwt")?.value;

    if (!authToken) {
      console.error("Auth token is missing");
      throw new Error("Auth token is missing");
    }

    const response = await fetch("https://swafe24fitness.azurewebsites.net/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userInfo, accountType }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(`Error creating ${accountType}:`, errorData.message);
      throw new Error(errorData.message || `Error creating ${accountType}`);
    }
  } catch (error) {
    console.error(`Error creating ${accountType}:`, error);
    throw error;
  }
};

