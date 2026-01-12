import axios from 'axios';
import { cookies } from 'next/headers';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } 
  else {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1];
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
});