import type { ComponentType } from "react";

export type NavItem = {
    label: string;
    to: string;
};

export type NavSection = {
    title: string;
    to: string;
    icon: ComponentType<{ className?: string }>;
    items: NavItem[];
};

export const utilityButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30";

export const isPathActive = (pathname: string, target: string) =>
    target === "/" ? pathname === "/" : pathname.startsWith(target);
