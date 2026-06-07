import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

type Props = {
    compact?: boolean;
};

export const NavbarBrand = ({ compact = false }: Props) => (
    <Link to="/" className="flex shrink-0 items-center gap-3">
        <div className={`relative grid place-items-center rounded-lg bg-emerald-100 text-emerald-700 shadow-sm ${compact ? "h-8 w-8" : "h-10 w-10"}`}>
            <Truck className={compact ? "h-4 w-4" : "h-5 w-5"} />
            <span className="absolute bottom-0 right-0 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
        <div>
            <div className="text-base font-black leading-none tracking-widest text-slate-900">
                CARGO <span className="text-emerald-600">TRACK</span>
            </div>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                LOGISTICS & COMMAND
            </p>
        </div>
    </Link>
);
