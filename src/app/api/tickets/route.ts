import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "../api-handler";

export async function GET() {
  try {
    const { data } = await api.get("/tickets");
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err, "Erro ao obter tickets");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = await api.post("/tickets", body);
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return handleApiError(err, "Erro ao criar ticket");
  }
}
