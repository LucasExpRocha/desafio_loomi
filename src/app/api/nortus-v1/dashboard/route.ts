import { api } from "@/lib/api";
import { NextResponse } from "next/server";

export const revalidate = 20;

export async function GET() {
  try {
    const { data } = await api.get(`/nortus-v1/dashboard`);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as { response?: { status?: number; data?: unknown } };
    const status = error.response?.status ?? 500;
    const payload = error.response?.data ?? {
      message: "Erro ao obter dashboard",
    };
    return NextResponse.json(payload, { status });
  }
}
