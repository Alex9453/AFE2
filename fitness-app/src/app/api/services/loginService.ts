export const loginUser = async (email: string, password: string) => {
    try {
      const response = await fetch("https://swafe24fitness.azurewebsites.net/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed. Please try again.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };
  