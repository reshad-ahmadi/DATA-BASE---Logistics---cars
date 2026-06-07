import { useState } from "react";
import { Bell, Menu, Search, Settings, X } from "lucide-react";
import type { ActionPanelType } from "./actionTypes";
import { ActionPanels } from "./ActionPanels";
import { ProfileTrigger } from "./ProfileTrigger";
import type { NavbarSettings, NavbarSettingsPatch } from "./settingsTypes";
import { utilityButtonClass } from "./types";

type Props = { settings: NavbarSettings; updateSettings: (patch: NavbarSettingsPatch) => void; mobileMenuOpen: boolean; toggleMobileMenu: () => void; };

export const NavbarActions = ({ settings, updateSettings, mobileMenuOpen, toggleMobileMenu }: Props) => {
    const [panel, setPanel] = useState<ActionPanelType>(null);
    const togglePanel = (name: ActionPanelType) => setPanel(panel === name ? null : name);

    return (
    <div className="relative flex items-center gap-2 sm:gap-3">
        <button onClick={() => togglePanel("search")} className={utilityButtonClass} aria-label="Search">
            <Search className="h-4 w-4" />
        </button>
        <button onClick={() => togglePanel("notifications")} className={`${utilityButtonClass} relative`} aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-green-400" />
        </button>
        <button onClick={() => togglePanel("settings")} className={utilityButtonClass} aria-label="Settings">
            <Settings className="h-4 w-4" />
        </button>
        <div className="hidden h-5 w-[1px] bg-slate-200 sm:block" />
        <ProfileTrigger onClick={() => togglePanel("profile")} />
        <button onClick={toggleMobileMenu} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:text-emerald-700 lg:hidden" aria-label="Toggle mobile menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <ActionPanels panel={panel} settings={settings} updateSettings={updateSettings} />
    </div>
    );
};
