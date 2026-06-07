export type Language = 'en' | 'da';

export const translations = {
  da: {
    transfers: { title: "انتقالات کانتینر", items: ["چین", "هند", "دبی"] },
    specs: { title: "مشخصات و قیمت‌ها", items: ["نمبر کانتینر", "نمبر BL", "بررسی کانتینر بارگیری شده", "قیمت خرید کانتینر", "قیمت فروش بالای مشتری"] },
    logistics: { title: "لجستیک و بارگیری", items: ["تاریخ بارگیری به مرز", "بارگیری به طرف مرز", "دخولی به گمرک", "تخلیه به موتر"] },
    costs: { title: "هزینه‌ها", items: ["هزینه گمرک", "هزینه کمیشن", "هزینه تخلیه و بارگیری", "هزینه مرز", "هزینه جواز"] },
    trucks: { title: "حسابات موتر", items: ["کرایه خط موتر", "جر", "لیفتراک"] },
    customers: { title: "حسابات مشتریان", items: ["روزنامچه", "بیلانس مشتریان"] },
    exchanges: { title: "صرافی‌ها", items: ["صرافی جلال آباد", "صرافی هرات", "سیف کابل"] },
    borders: { title: "مرزها", items: ["شرکت وحدت (اسلام قلعه)", "روزنک", "مسلم (فراه ماهیرود)", "نیمروز", "حیرتان (مزار شریف)"] },
    reports: { title: "گزارشات", items: ["بیلانس هفته وار", "بیلانس ماهوار", "بیلانس مکمل"] },
    search: "جستجوی کانتینر، مرسوله...",
    subtitle: "مدیریت و لجستیک",
    admin: "مدیر",
  },
  en: {
    transfers: { title: "Container Transfers", items: ["China", "India", "Dubai"] },
    specs: { title: "Specs & Prices", items: ["Container Number", "BL Number", "Loaded Inspection", "Purchase Price", "Selling Price"] },
    logistics: { title: "Logistics", items: ["Border Loading Date", "Loading to Border", "Customs Entry", "Truck Unloading"] },
    costs: { title: "Costs", items: ["Customs Fee", "Commission Fee", "Unloading/Loading Fee", "Border Fee", "License Fee"] },
    trucks: { title: "Truck Accounts", items: ["Truck Fare", "Crane", "Forklift"] },
    customers: { title: "Customer Accounts", items: ["Journal", "Customer Balances"] },
    exchanges: { title: "Exchanges", items: ["Jalalabad Exchange", "Herat Exchange", "Kabul Safe"] },
    borders: { title: "Borders", items: ["Wahdat (Islam Qala)", "Rozanak", "Muslim (Farah Mahirood)", "Nimroz", "Hairatan (Mazar-i-Sharif)"] },
    reports: { title: "Reports", items: ["Weekly Balance", "Monthly Balance", "Complete Balance"] },
    search: "Search containers, shipments...",
    subtitle: "Logistics & Command",
    admin: "Administrator",
  }
};
