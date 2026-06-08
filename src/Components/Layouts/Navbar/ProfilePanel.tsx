import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const ProfilePanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
        <p className="text-sm font-black text-slate-100">{user?.username ?? "User"}</p>
        <p className="text-xs font-bold uppercase tracking-wider text-green-500">
          {user?.role ?? "Staff"}
        </p>
        {user?.email && <p className="mt-1 text-xs text-slate-400">{user.email}</p>}
      </div>
      <div className="grid gap-2">
        <Link to="/reports" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-green-400">
          Company balance
        </Link>
        <Link to="/customers" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-green-400">
          Customer accounts
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
