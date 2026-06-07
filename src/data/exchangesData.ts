export interface ExchangeTransaction {
  id: string; exchangeName: string; exchangeNameDA: string; date: string;
  type: "incoming" | "outgoing"; sourceAmount: number; sourceCurrency: "USD" | "AFN" | "PKR" | "IRR";
  targetAmount: number; targetCurrency: "USD" | "AFN" | "PKR" | "IRR"; rate: number;
  status: "completed" | "pending"; notes: string; notesDA: string;
}

export const exchangesData: ExchangeTransaction[] = [
  { id: "EXCH-001", exchangeName: "Jalalabad Exchange", exchangeNameDA: "صرافی جلال آباد", date: "2026-06-01", type: "outgoing", sourceAmount: 15000, sourceCurrency: "USD", targetAmount: 1065000, targetCurrency: "AFN", rate: 71, status: "completed", notes: "Converted USD to AFN for customs clearance fees at Torkham.", notesDA: "تبدیل دالر به افغانی جهت پرداخت محصول گمرک تورخم." },
  { id: "EXCH-002", exchangeName: "Herat Exchange", exchangeNameDA: "صرافی هرات", date: "2026-06-02", type: "outgoing", sourceAmount: 8000, sourceCurrency: "USD", targetAmount: 704000000, targetCurrency: "IRR", rate: 88000, status: "completed", notes: "Transferred IRR for truck fuel and transit costs in Islam Qala.", notesDA: "انتقال تومان برای مصارف تیل موترها و ترانزیت در اسلام قلعه." },
  { id: "EXCH-003", exchangeName: "Kabul Safe", exchangeNameDA: "سیف کابل", date: "2026-06-02", type: "incoming", sourceAmount: 25000, sourceCurrency: "USD", targetAmount: 25000, targetCurrency: "USD", rate: 1, status: "completed", notes: "Received customer balance settlement from Haji Noor.", notesDA: "دریافت تسویه حساب مشتری از حاجی نور." },
  { id: "EXCH-004", exchangeName: "Jalalabad Exchange", exchangeNameDA: "صرافی جلال آباد", date: "2026-06-03", type: "outgoing", sourceAmount: 5000, sourceCurrency: "USD", targetAmount: 1375000, targetCurrency: "PKR", rate: 275, status: "pending", notes: "Transit charges payment for Peshawar route.", notesDA: "پرداخت هزینه‌های ترانزیت برای مسیر پیشاور." },
  { id: "EXCH-005", exchangeName: "Herat Exchange", exchangeNameDA: "صرافی هرات", date: "2026-06-03", type: "incoming", sourceAmount: 12000, sourceCurrency: "USD", targetAmount: 852000, targetCurrency: "AFN", rate: 71, status: "completed", notes: "Exchanged USD from customer Karim Logistics.", notesDA: "تبدیل دالر مشتری کریم لجستیک به افغانی." },
  { id: "EXCH-006", exchangeName: "Kabul Safe", exchangeNameDA: "سیف کابل", date: "2026-06-03", type: "outgoing", sourceAmount: 18000, sourceCurrency: "USD", targetAmount: 1278000, targetCurrency: "AFN", rate: 71, status: "pending", notes: "Office expenses and staff salaries distribution.", notesDA: "توزیع مصارف دفتر و معاشات پرسونل." },
];
