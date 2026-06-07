import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "./Auth/AuthCard";
import { AuthField } from "./Auth/AuthField";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setMessage("User registration is managed by an administrator. Please contact your admin or use the default login credentials.");
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <AuthCard title="Create Staff Account" subtitle="ثبت کاربر جدید برای مدیریت شرکت" switchText="Already have an account? Login" switchTo="/login">
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Full Name" name="name" placeholder="Ahmad Manager" />
        <AuthField label="Email" name="email" type="email" placeholder="user@cargotrack.com" />
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Role</span>
          <select className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500">
            {["Admin", "Accountant", "Logistics Manager", "Border Agent", "Viewer"].map((role) => <option key={role}>{role}</option>)}
          </select>
        </label>
        <AuthField label="Password" name="password" type="password" placeholder="Create password" />
        {message && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">{message}</p>}
        <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700">
          Request Account
        </button>
      </form>
    </AuthCard>
  );
};

export default Signup;
