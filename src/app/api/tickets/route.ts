import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await api.get("/tickets");
    return NextResponse.json(data);
  } catch (err: unknown) {
    const e = err as { response?: { status?: number; data?: unknown } };
    const status = e.response?.status ?? 500;
    const payload = e.response?.data ?? { message: "Erro ao obter tickets" };
    return NextResponse.json(payload, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post("/tickets", body);
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const e = err as { response?: { status?: number; data?: unknown } };
    const status = e.response?.status ?? 500;
    const payload = e.response?.data ?? { message: "Erro ao criar ticket" };
    return NextResponse.json(payload, { status });
  }
}
