import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "../../api-handler";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const { data } = await api.patch(`/tickets/${id}`, body);
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err, "Erro ao atualizar ticket");
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { data } = await api.get(`/tickets/${id}`);
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err, "Erro ao obter ticket");
  }
}
