import type { NavbarSettings, NavbarSettingsPatch } from "./settingsTypes";

type SettingRow = {
    label: string;
    active: boolean;
    onClick: () => void;
};

type Props = {
    settings: NavbarSettings;
    updateSettings: (patch: NavbarSettingsPatch) => void;
};

export const SettingsPanel = ({ settings, updateSettings }: Props) => {
    const rows: SettingRow[] = [
        { label: "Compact mode", active: settings.compactMode, onClick: () => updateSettings({ compactMode: !settings.compactMode }) },
        { label: "Daily report alerts", active: settings.dailyAlerts, onClick: () => updateSettings({ dailyAlerts: !settings.dailyAlerts }) },
    ];

    return (
    <div className="space-y-2">
        {rows.map((setting) => (
            <button
                key={setting.label}
                onClick={setting.onClick}
                className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-left text-sm font-semibold text-slate-200 hover:border-green-500/40"
            >
                <span>{setting.label}</span>
                <span className={`h-5 w-9 rounded-full ring-1 ${setting.active ? "bg-green-500/30 ring-green-500/60" : "bg-slate-800 ring-slate-700"}`} />
            </button>
        ))}
    </div>
    );
};
