import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export const revalidate = 5;

export async function GET() {
  try {
    const { data } = await api.get('/nortus-v1/simulador-planos');
    return NextResponse.json(data);
  } catch (err: unknown) {
    const e = err as { response?: { status?: number; data?: unknown } };
    const status = e.response?.status ?? 500;
    const payload = e.response?.data ?? {
      message: 'Erro ao obter simulador de planos',
    };
    return NextResponse.json(payload, { status });
  }
}
