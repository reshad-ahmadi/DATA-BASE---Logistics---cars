export interface BorderRecord {
  id: string; companyName: string; companyNameDA: string; borderName: string; borderNameDA: string;
  containersCount: number; status: "Loading" | "Customs Entry" | "Cleared" | "Delayed";
  totalFees: number; lastUpdate: string; notes: string; notesDA: string;
}

export const bordersData: BorderRecord[] = [
  { id: "BORD-001", companyName: "Wahdat Company", companyNameDA: "شرکت وحدت", borderName: "Islam Qala (Herat)", borderNameDA: "اسلام قلعه (هرات)", containersCount: 12, status: "Customs Entry", totalFees: 24500, lastUpdate: "2026-06-03", notes: "Customs duty assessment in progress for 8 containers.", notesDA: "بررسی محصول گمرکی برای ۸ کانتینر در جریان است." },
  { id: "BORD-002", companyName: "Rozanak Transit", companyNameDA: "روزنک ترانزیت", borderName: "Rozanak Rail (Herat)", borderNameDA: "روزنک (هرات)", containersCount: 5, status: "Loading", totalFees: 9200, lastUpdate: "2026-06-02", notes: "Loading cargo from train wagons onto domestic trucks.", notesDA: "بارگیری محموله از واگون‌های قطار به موترهای داخلی." },
  { id: "BORD-003", companyName: "Muslim Company", companyNameDA: "شرکت مسلم", borderName: "Farah Mahirood", borderNameDA: "فراه ماهیرود", containersCount: 8, status: "Delayed", totalFees: 18400, lastUpdate: "2026-06-03", notes: "Delayed due to weight bridge scale system downtime.", notesDA: "تاخیر به دلیل عوارض تخنیکی سیستم ترازوی دیجیتالی مرز." },
  { id: "BORD-004", companyName: "Nimroz Cargo Services", companyNameDA: "خدمات کارگو نیمروز", borderName: "Nimroz Border", borderNameDA: "نیمروز", containersCount: 15, status: "Cleared", totalFees: 31200, lastUpdate: "2026-06-03", notes: "All containers successfully cleared and dispatched to Kabul.", notesDA: "تمامی کانتینرها موفقانه ترخیص شده و به طرف کابل حرکت کردند." },
  { id: "BORD-005", companyName: "Hairatan Logistics", companyNameDA: "لجستیک حیرتان", borderName: "Hairatan (Mazar-i-Sharif)", borderNameDA: "حیرتان (مزار شریف)", containersCount: 6, status: "Customs Entry", totalFees: 12800, lastUpdate: "2026-06-01", notes: "Documents submitted for customs clearance. Inspection scheduled.", notesDA: "اسناد به گمرک تحویل داده شد. زمان بررسی فزیکی هماهنگ شده است." },
];

export const borderStatusColors: Record<BorderRecord["status"], string> = {
  Loading: "bg-blue-50 text-blue-700 border-blue-200",
  "Customs Entry": "bg-amber-50 text-amber-700 border-amber-200",
  Cleared: "bg-green-50 text-green-700 border-green-200",
  Delayed: "bg-rose-50 text-rose-700 border-rose-200",
};
