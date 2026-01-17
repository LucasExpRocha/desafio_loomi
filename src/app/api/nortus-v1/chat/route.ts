import { api } from '@/lib/api';
import { NextResponse } from 'next/server';
import { handleApiError } from '../../api-handler';

export async function GET() {
  try {
    const { data } = await api.get('/nortus-v1/chat');
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err, 'Erro ao obter chat');
  }
}
