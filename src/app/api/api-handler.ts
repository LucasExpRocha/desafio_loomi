import { NextResponse } from "next/server";
import { AxiosError } from "axios";

export function handleApiError(err: unknown, defaultMessage: string) {
  const error = err as AxiosError<{ message: string }>;
  const status = error.response?.status ?? 500;
  const payload = error.response?.data ?? { message: defaultMessage };
  return NextResponse.json(payload, { status });
}
