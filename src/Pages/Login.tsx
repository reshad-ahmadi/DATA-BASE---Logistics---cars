import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "./Auth/AuthCard";
import { AuthField } from "./Auth/AuthField";

const Login = () => {
  const navigate = useNavigate();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <AuthCard title="Login to CargoTrack" subtitle="ورود به سیستم مدیریت لوژستیک و حسابداری" switchText="Need an account? Request sign up" switchTo="/signup">
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Email" name="email" type="email" placeholder="admin@cargotrack.com" />
        <AuthField label="Password" name="password" type="password" placeholder="Enter password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="rounded border-slate-300" /> Remember me
          </label>
          <button type="button" className="font-semibold text-blue-600">Forgot?</button>
        </div>
        <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700">
          Login
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
