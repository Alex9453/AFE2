"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');
    console.log("Dashboard: Token from cookies:", token);

    if (!token) {
      console.log("Dashboard: No token, redirecting to login");
      router.push('/');
      return;
    }

    try {
      // Decode the JWT to extract the role
      const decoded = jwtDecode<{ Role: string }>(token);
      console.log("Dashboard: Decoded token:", decoded);

      const role = decoded.Role;
      if (role === 'Manager') {
        router.push('/manager-dashboard');
      } else if (role === 'PersonalTrainer') {
        router.push('/trainer-dashboard');
      } else if (role === 'Client') {
        router.push('/client-dashboard');
      } else {
        console.log("Dashboard: Unknown role, redirecting to login");
      }
    } catch (error) {
      console.error("Dashboard: Error decoding token:", error);
      router.push('/');
    }
  }, [router]);

  return <div>Loading...</div>;
}