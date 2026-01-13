import { api } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await api.get('/nortus-v1/chat');
    return NextResponse.json(data);
  } catch (err: unknown) {
    const e = err as { response?: { status?: number; data?: unknown } };
    const status = e.response?.status ?? 200;
    const payload = e.response?.data ?? { message: 'Erro ao obter chat' };
    return NextResponse.json(payload, { status });
  }
}
