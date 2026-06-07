import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { ChevronDown, Circle } from "lucide-react";
import type { NavSection } from "./types";
import { isPathActive } from "./types";

type Props = {
    section: NavSection;
    pathname: string;
};

export const DesktopMenuLink = ({ section, pathname }: Props) => {
    const active = isPathActive(pathname, section.to);
    const hasItems = section.items.length > 0;
    const Icon = section.icon;

    return (
        <div className="group">
            <RouterNavLink
                to={section.to}
                end={section.to === "/"}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                    active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
            >
                <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {section.title}
                </span>
                {hasItems && <ChevronDown className={`h-4 w-4 ${active ? "rotate-180" : ""}`} />}
            </RouterNavLink>
            {hasItems && active && (
                <div className="ml-6 mt-2 space-y-1 border-l border-slate-200 pl-4">
                    {section.items.map((item, index) => (
                        <Link key={item.to} to={item.to} className="flex items-center justify-between rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 hover:bg-emerald-50 hover:text-emerald-700">
                            <span className="flex items-center gap-2"><Circle className="h-2 w-2 fill-slate-300 text-slate-300" />{item.label}</span>
                            {index % 3 === 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-[10px] text-emerald-700">{index + 1}</span>}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
