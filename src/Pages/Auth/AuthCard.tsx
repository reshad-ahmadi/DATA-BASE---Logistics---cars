import { Link } from "react-router-dom";

type Props = {
  title: string;
  subtitle: string;
  switchText: string;
  switchTo: string;
  children: React.ReactNode;
};

export const AuthCard = ({ title, subtitle, switchText, switchTo, children }: Props) => (
  <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-white p-8 text-slate-900 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-green-500 text-xl font-black text-white">CT</div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        {children}
        <Link to={switchTo} className="mt-5 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          {switchText}
        </Link>
      </div>
    </div>
  </div>
);
