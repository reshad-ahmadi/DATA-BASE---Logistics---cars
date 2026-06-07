type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
};

export const AuthField = ({ label, name, type = "text", placeholder, autoComplete }: Props) => (
  <label className="block">
    <span className="text-sm font-semibold text-slate-700">{label}</span>
    <input
      required
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
    />
  </label>
);
