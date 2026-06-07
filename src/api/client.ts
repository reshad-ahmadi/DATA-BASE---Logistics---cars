import { API_BASE } from "./config";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export function getToken() {
  return localStorage.getItem("cargo_token");
}

export function setToken(token: string) {
  localStorage.setItem("cargo_token", token);
}

export function clearToken() {
  localStorage.removeItem("cargo_token");
  localStorage.removeItem("cargo_user");
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  auth = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(
      "Cannot reach the API server. Make sure the backend is running on port 5050.",
      0,
    );
  }

  let payload: ApiResponse<T>;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError("Invalid response from API server.", response.status);
  }

  if (!response.ok || payload.success === false) {
    if (response.status === 401 && auth) {
      clearToken();
    }
    throw new ApiError(payload.message ?? "Request failed", response.status);
  }

  return payload.data;
}
