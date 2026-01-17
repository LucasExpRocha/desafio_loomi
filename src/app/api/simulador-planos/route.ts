import { api } from '@/lib/api';
import { NextResponse } from 'next/server';
import { handleApiError } from '../api-handler';

export const revalidate = 5;

export async function GET() {
  try {
    const { data } = await api.get('/nortus-v1/simulador-planos');
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err, 'Erro ao obter simulador de planos');
  }
}
