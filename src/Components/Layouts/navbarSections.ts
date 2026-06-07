import { BarChart3, Boxes, CircleDollarSign, ClipboardList, MapPinned, Package, PackageCheck, ShieldCheck, Truck, UserRound, WalletCards } from "lucide-react";
import type { Language } from "../../data/translations";
import type { NavSection } from "./NavbarParts";

type TranslationSet = {
    transfers: { items: string[] }; specs: { items: string[] };
    logistics: { items: string[] }; costs: { items: string[] };
    trucks: { items: string[] }; customers: { items: string[] };
    exchanges: { items: string[] }; borders: { items: string[] };
};

const fixed = (labels: string[], to: string) => labels.map((label) => ({ label, to }));
const byIndex = (labels: string[], values: string[], makeTo: (value: string) => string) =>
    labels.map((label, index) => ({ label, to: makeTo(values[index]) }));

export const getNavbarSections = (lang: Language, t: TranslationSet): NavSection[] => {
    const transferOrigins = ["China", "India", "Dubai"];
    const logisticsRoutes = ["/logistics", "/logistics?status=In%20Transit", "/logistics?status=Customs", "/logistics?status=Cleared"];
    const costCategories = ["Customs Fee", "Commission Fee", "Unloading Fee", "Border Fee", "License Fee"];
    const truckCategories = ["Truck Fare", "Crane Fee", "Forklift"];

    return [
        { title: lang === "da" ? "Dashboard" : "Command", to: "/", icon: BarChart3, items: [] },
        { title: "Containers", to: "/containers", icon: Package, items: fixed(["All Containers", "BL / Loading / Status"], "/containers").concat({ label: "Register Container", to: "/containers/new" }) },
        { title: "Container Transfers", to: "/transfers", icon: PackageCheck, items: byIndex(t.transfers.items, transferOrigins, (origin) => `/transfers?origin=${origin}`) },
        { title: "Specs & Prices", to: "/specs", icon: ClipboardList, items: fixed(t.specs.items, "/specs") },
        { title: "Logistics", to: "/logistics", icon: MapPinned, items: t.logistics.items.map((label, i) => ({ label, to: logisticsRoutes[i] })) },
        { title: "Costs", to: "/costs", icon: CircleDollarSign, items: byIndex(t.costs.items, costCategories, (category) => `/costs?category=${encodeURIComponent(category)}`) },
        { title: "Truck Accounts", to: "/trucks", icon: Truck, items: byIndex(t.trucks.items, truckCategories, (category) => `/trucks?category=${encodeURIComponent(category)}`) },
        { title: "Customer Accounts", to: "/customers", icon: UserRound, items: fixed(t.customers.items, "/customers") },
        { title: "Exchanges", to: "/exchanges", icon: WalletCards, items: fixed(t.exchanges.items, "/exchanges") },
        { title: "Borders", to: "/borders", icon: ShieldCheck, items: fixed(t.borders.items, "/borders") },
        { title: "Reports & Balance", to: "/reports", icon: Boxes, items: fixed(["Daily Report", "Weekly Report", "Monthly Report", "Company Balance"], "/reports") },
    ];
};
