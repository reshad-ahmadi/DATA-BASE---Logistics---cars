type Props = {
  label: string;
  placeholder?: string;
  type?: string;
};

export const FormField = ({ label, placeholder, type = "text" }: Props) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input
      required
      type={type}
      placeholder={placeholder}
      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </label>
);
