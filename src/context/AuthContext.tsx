import { useMemo, useState, type ReactNode } from "react";
import { clearToken, getToken, setToken } from "../api/client";
import { authApi } from "../api/services";
import type { AuthUser } from "../api/types";
import { AuthContext, type AuthContextValue } from "./auth-context";

const readStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem("cargo_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => (getToken() ? readStoredUser() : null));

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(getToken()),
      login: async (username, password) => {
        const result = await authApi.login(username, password);
        setToken(result.token);
        localStorage.setItem("cargo_user", JSON.stringify(result.user));
        setUser(result.user);
      },
      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          clearToken();
          setUser(null);
        }
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
