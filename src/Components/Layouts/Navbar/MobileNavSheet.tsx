import { Link } from "react-router-dom";
import type { NavSection } from "./types";
import { MobileProfile } from "./MobileProfile";
import { MobileSection } from "./MobileSection";

type Props = {
    sections: NavSection[];
    pathname: string;
    closeMenu: () => void;
};

export const MobileNavSheet = ({ sections, pathname, closeMenu }: Props) => (
    <div className="fixed inset-x-0 bottom-0 top-[84px] z-40 h-[calc(100vh-84px)] w-full bg-slate-900/40 backdrop-blur-sm lg:hidden">
        <div className="no-scrollbar h-full overflow-y-auto px-4 py-4">
            <div className="mx-auto flex max-w-md flex-col gap-2 rounded-[2rem] bg-white p-4 pb-8 shadow-2xl">
                <MobileProfile />
                {sections.map((section) => (
                    <MobileSection
                        key={section.to}
                        section={section}
                        pathname={pathname}
                        closeMenu={closeMenu}
                    />
                ))}
                <Link
                    to="/containers/new"
                    onClick={closeMenu}
                    className="mt-3 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-slate-900/15 hover:bg-slate-800"
                >
                    Add New Container
                </Link>
            </div>
        </div>
    </div>
);
