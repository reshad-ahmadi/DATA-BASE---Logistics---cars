import { UserRound } from "lucide-react";

type Props = {
    onClick: () => void;
};

export const ProfileTrigger = ({ onClick }: Props) => (
    <button onClick={onClick} className="hidden items-center gap-3 pl-1 sm:flex">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 font-bold text-emerald-700">
            <UserRound className="h-4 w-4" />
        </div>
        <div className="hidden text-left leading-tight md:block">
            <div className="text-xs font-bold text-slate-900">Reshad</div>
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">
                Admin
            </div>
        </div>
    </button>
);
