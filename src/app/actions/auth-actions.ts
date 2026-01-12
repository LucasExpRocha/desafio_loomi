'use server';

import { signIn, signOut } from '@/auth';
import { decodeJwt } from '@/lib/decodeJwt';
import { LoginFormData } from '@/validation/login';
import { AuthError } from 'next-auth';
import { cookies } from "next/headers";

export async function login(data: LoginFormData) {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result && result.accessToken) {
      const { payload } = decodeJwt(result.accessToken);
      const expires = payload.exp ? new Date(payload.exp * 1000) : null;

      const cookieStore = await cookies();
      cookieStore.set('access', result.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: expires ? Math.floor((expires.getTime() - Date.now()) / 1000) : 60 * 60,
      });
    }
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
