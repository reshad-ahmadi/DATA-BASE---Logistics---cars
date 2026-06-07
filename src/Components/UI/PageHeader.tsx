import { Link } from "react-router-dom";

type Props = {
  title: string;
  subtitle: string;
  action?: string;
  actionTo?: string;
};

export const PageHeader = ({ title, subtitle, action, actionTo }: Props) => (
  <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
    {action && actionTo ? (
      <Link to={actionTo} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
        {action}
      </Link>
    ) : action ? (
      <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
        {action}
      </button>
    ) : null}
  </div>
);
