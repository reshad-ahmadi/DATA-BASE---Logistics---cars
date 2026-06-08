import type { FormEvent } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthCard } from "./Auth/AuthCard";
import { AuthField } from "./Auth/AuthField";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      const redirect = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Login to CargoTrack" subtitle="ورود به سیستم مدیریت لوژستیک و حسابداری" switchText="Need an account? Request sign up" switchTo="/signup">
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Username" name="username" placeholder="admin" autoComplete="username" />
        <AuthField label="Password" name="password" type="password" placeholder="Admin@12345" autoComplete="current-password" />
        <p className="text-xs text-slate-500">Use username <strong>admin</strong>, not your email address.</p>
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="rounded border-slate-300" /> Remember me
          </label>
          <button type="button" className="font-semibold text-blue-600">Forgot?</button>
        </div>
        <button disabled={loading} className="w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
