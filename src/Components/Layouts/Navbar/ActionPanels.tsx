import { ActionPopover } from "./ActionPopover";
import type { ActionPanelType } from "./actionTypes";
import { NotificationsPanel } from "./NotificationsPanel";
import { ProfilePanel } from "./ProfilePanel";
import { SearchPanel } from "./SearchPanel";
import { SettingsPanel } from "./SettingsPanel";
import type { NavbarSettings, NavbarSettingsPatch } from "./settingsTypes";

type Props = {
    panel: ActionPanelType;
    settings: NavbarSettings;
    updateSettings: (patch: NavbarSettingsPatch) => void;
};

export const ActionPanels = ({ panel, settings, updateSettings }: Props) => (
    <>
        {panel === "search" && (
            <ActionPopover title="Search"><SearchPanel /></ActionPopover>
        )}
        {panel === "notifications" && (
            <ActionPopover title="Notifications"><NotificationsPanel /></ActionPopover>
        )}
        {panel === "settings" && (
            <ActionPopover title="Quick Settings">
                <SettingsPanel settings={settings} updateSettings={updateSettings} />
            </ActionPopover>
        )}
        {panel === "profile" && (
            <ActionPopover title="Profile"><ProfilePanel /></ActionPopover>
        )}
    </>
);
