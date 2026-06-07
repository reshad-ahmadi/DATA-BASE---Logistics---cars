import type { ReactNode } from "react";

type Props = {
  loading: boolean;
  error: string | null;
  empty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
};

export const AsyncState = ({
  loading,
  error,
  empty = false,
  emptyMessage = "No records found.",
  children,
}: Props) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        Loading data from API...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700 shadow-sm">
        {error}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return <>{children}</>;
};
