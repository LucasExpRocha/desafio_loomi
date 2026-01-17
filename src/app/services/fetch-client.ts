import { AppToast } from "@/lib/toast";

export async function fetchClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    AppToast("error", errorData.message || `Request failed with status ${res.status}`);
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}