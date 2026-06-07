import type { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export const ActionPopover = ({ title, children }: Props) => (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-black/50">
        <div className="mb-3 border-b border-slate-800 pb-2">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-400">
                {title}
            </p>
        </div>
        {children}
    </div>
);
