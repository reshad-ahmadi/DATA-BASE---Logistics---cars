import {
  BarChart3, CircleDollarSign, Package, PackageCheck,
  ShieldCheck, Truck, Users, WalletCards,
} from "lucide-react";

export const trailerSlots = [
  { code: "A12", kg: "500 kg", status: "LOADED", accent: "bg-violet-600", utilization: 94 },
  { code: "A12", kg: "300 kg", status: "EMPTY", accent: "bg-slate-100", utilization: 42 },
  { code: "EXPRESS", kg: "500 kg", status: "INT-U", accent: "bg-slate-100", utilization: 89 },
  { code: "RAILS", kg: "300 kg", status: "READY", accent: "bg-slate-100", utilization: 77 },
  { code: "ACR", kg: "200 kg", status: "LOADED", accent: "bg-slate-100", utilization: 66 },
  { code: "AVD", kg: "200 kg", status: "READY", accent: "bg-slate-100", utilization: 58 },
];

export const orderList = [
  { customer: "Mandy Kick", shippingId: "#9836", location: "99 Green Road", status: "Complete" },
  { customer: "Ricki Carbon", shippingId: "#1130", location: "54 Park Street", status: "On Delivery" },
  { customer: "Anesa Vickly", shippingId: "#6824", location: "81 Steve River", status: "On Delivery" },
  { customer: "Kolby Bird", shippingId: "#9102", location: "32 Lacosta Build", status: "Complete" },
  { customer: "Amanda Monti", shippingId: "#5729", location: "91 Armuno Street", status: "Complete" },
];

export const requirementModules = [
  { title: "Container Management", titleDA: "مدیریت کانتینرها", description: "Container number, BL, loading date, route, and shipment status.", to: "/containers", icon: Package },
  { title: "Transfers", titleDA: "انتقالات چین، هند و دبی", description: "Track origins, border routes, customs movement, and delivery stage.", to: "/transfers", icon: PackageCheck },
  { title: "Container Costs", titleDA: "هزینه‌های کانتینر", description: "Customs, commission, unloading, border fees, license, and other costs.", to: "/costs", icon: CircleDollarSign },
  { title: "Truck Loading", titleDA: "مدیریت بارگیری موترها", description: "Truck number, driver, route, fare, crane, forklift, and damage costs.", to: "/trucks", icon: Truck },
  { title: "Customer Accounts", titleDA: "حسابات مشتریان", description: "Invoices, payments, ledgers, balances, payable and receivable reports.", to: "/customers", icon: Users },
  { title: "Exchange Accounts", titleDA: "حسابات صرافی‌ها", description: "Hawala, receive/pay records, exchange balances, and cash-flow reports.", to: "/exchanges", icon: WalletCards },
  { title: "Border Accounts", titleDA: "حسابات مرزها", description: "Border expenses, payments, agency ledgers, and independent balances.", to: "/borders", icon: ShieldCheck },
  { title: "Financial Reports", titleDA: "گزارشات مالی", description: "Daily, weekly, monthly, company balance, income and expense reports.", to: "/reports", icon: BarChart3 },
];
