'use server';

import { signIn, signOut } from '@/auth';
import { api } from '@/lib/api';
import { decodeJwt } from '@/lib/decodeJwt';
import { LoginFormData } from '@/validation/login';
import { AuthError } from 'next-auth';
import { cookies } from "next/headers";

export async function login(data: LoginFormData) {
  try {
    const loginResponse = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (loginResponse.data?.access_token) {
      const accessToken = loginResponse.data.access_token;
      const { payload } = decodeJwt(accessToken);
      const expires = payload.exp ? new Date(payload.exp * 1000) : null;

      const cookieStore = await cookies();
      cookieStore.set('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: expires ? Math.floor((expires.getTime() - Date.now()) / 1000) : 60 * 60,
      });
    }

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas.' };
        default:
          return { error: 'Algo deu errado.' };
      }
    }
    console.error(error);
    return { error: 'Ocorreu um erro inesperado.' };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
