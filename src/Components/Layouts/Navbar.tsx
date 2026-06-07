import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { translations, type Language } from "../../data/translations";
import { DesktopNav } from "./Navbar/DesktopNav";
import { MobileNavSheet } from "./Navbar/MobileNavSheet";
import { NavbarActions } from "./Navbar/NavbarActions";
import { NavbarBrand } from "./Navbar/NavbarBrand";
import { getNavbarSections } from "./navbarSections";
import type { NavbarSettingsPatch } from "./Navbar/settingsTypes";

const Navbar = () => {
  const [lang] = useState<Language>("da");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({ compactMode: false, dailyAlerts: true });
  const { pathname } = useLocation();
  const sections = getNavbarSections(lang, translations[lang]);
  const updateSettings = (patch: NavbarSettingsPatch) => setSettings((current) => ({ ...current, ...patch }));

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 select-none border-b border-slate-200 bg-white text-slate-900 shadow-sm" dir={lang === "da" ? "rtl" : "ltr"}>
      <div className={`mx-auto w-full max-w-[2560px] px-4 md:px-6 2xl:px-8 ${settings.compactMode ? "py-2" : "py-3"}`}>
        <div className={`flex items-center justify-between gap-4 ${settings.compactMode ? "pb-2" : "pb-3"}`}>
          <NavbarBrand compact={settings.compactMode} />
          <NavbarActions settings={settings} updateSettings={updateSettings} mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={() => setMobileMenuOpen((open) => !open)} />
        </div>
        <DesktopNav sections={sections} pathname={pathname} />
      </div>
      {mobileMenuOpen && <MobileNavSheet sections={sections} pathname={pathname} closeMenu={() => setMobileMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;