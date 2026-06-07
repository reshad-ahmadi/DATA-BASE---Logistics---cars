import { Link } from "react-router-dom";
import type { NavSection } from "./types";
import { DesktopMenuLink } from "./DesktopMenuLink";
import { SidebarProfile } from "./SidebarProfile";

type Props = {
    sections: NavSection[];
    pathname: string;
};

export const DesktopNav = ({ sections, pathname }: Props) => (
    <aside className="fixed bottom-6 left-6 top-[105px] z-40 hidden w-72 flex-col rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 lg:flex">
        <SidebarProfile />
        <div className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto pt-2">
            {sections.map((section) => (
                <DesktopMenuLink
                    key={section.to}
                    section={section}
                    pathname={pathname}
                />
            ))}
        </div>
        <Link
            to="/containers/new"
            className="mt-5 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800"
        >
            Add New Container
        </Link>
    </aside>
);
