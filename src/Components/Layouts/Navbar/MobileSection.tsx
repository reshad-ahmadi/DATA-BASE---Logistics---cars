import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { NavSection } from "./types";
import { isPathActive } from "./types";

type Props = {
    section: NavSection;
    pathname: string;
    closeMenu: () => void;
};

export const MobileSection = ({ section, pathname, closeMenu }: Props) => {
    const active = isPathActive(pathname, section.to);
    const [isOpen, setIsOpen] = useState(active);
    const hasItems = section.items.length > 0;
    const Icon = section.icon;

    return (
        <div className="overflow-hidden rounded-xl bg-white">
            <div className="flex items-center justify-between p-1">
                <RouterNavLink
                    to={section.to}
                    end={section.to === "/"}
                    onClick={hasItems ? undefined : closeMenu}
                    className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-all ${
                        active ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                    <Icon className="h-4 w-4" />
                    <span>{section.title}</span>
                </RouterNavLink>
                {hasItems && (
                    <button onClick={() => setIsOpen(!isOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50">
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                )}
            </div>
            {hasItems && isOpen && (
                <div className="ml-6 grid grid-cols-1 gap-0.5 border-l border-slate-200 p-1 pl-4">
                    {section.items.map((item) => (
                        <Link key={item.to} to={item.to} onClick={closeMenu} className="rounded-md px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-emerald-50 hover:text-emerald-700">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
