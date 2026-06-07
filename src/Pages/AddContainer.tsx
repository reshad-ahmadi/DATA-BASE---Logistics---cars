import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../Components/UI/PageHeader";

type Field = {
  label: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  rows?: number;
  span?: "full";
};

type Section = {
  title: string;
  subtitle: string;
  fields: Field[];
};

const objectives = [
  "مدیریت کامل انتقالات کانتینرها",
  "ثبت مشخصات، مسیر و وضعیت هر کانتینر",
  "مدیریت هزینه‌های گمرکی، مرزی، ترانسپورتی و بارگیری",
  "مدیریت حسابات مشتریان، صرافی‌ها، مرزها و نمایندگی‌ها",
  "تهیه گزارشات روزانه، هفتگی، ماهانه و بیلانس مکمل مالی شرکت",
];

const sections: Section[] = [
  {
    title: "بخش اول: مدیریت کانتینر و انتقالات",
    subtitle: "ثبت انتقالات از چین، هند و دبی تا افغانستان همراه با مشخصات کامل کانتینر.",
    fields: [
      { label: "نمبر کانتینر / Container No.", placeholder: "MSKU-1234567" },
      { label: "نمبر BL", placeholder: "BL-000000" },
      { label: "کشور مبدا", options: ["چین", "هند", "دبی"] },
      { label: "تاریخ بارگیری", type: "date" },
      { label: "محل بارگیری", placeholder: "China Port / Dubai / India" },
      { label: "مسیر انتقال", options: ["بندر عباس", "دوغارون", "اسلام قلعه", "روزنک", "فراه (ماهیرود)", "نیمروز", "حیرتان"] },
      { label: "وضعیت کانتینر", options: ["بارگیری شده", "در مسیر", "داخل گمرک", "تخلیه شده", "تحویل مشتری"] },
      { label: "مقصد نهایی", placeholder: "Herat / Kabul / Mazar / Customer warehouse" },
    ],
  },
  {
    title: "بخش دوم: مدیریت هزینه‌های کانتینر",
    subtitle: "ثبت تمام مصارف مستقیم کانتینر برای محاسبه قیمت تمام‌شده و مفاد.",
    fields: [
      { label: "هزینه گمرک", type: "number", placeholder: "0" },
      { label: "هزینه کمیشن", type: "number", placeholder: "0" },
      { label: "هزینه تخلیه و بارگیری", type: "number", placeholder: "0" },
      { label: "هزینه مرزی", type: "number", placeholder: "0" },
      { label: "هزینه جواز", type: "number", placeholder: "0" },
      { label: "سایر مصارف", type: "number", placeholder: "0" },
    ],
  },
  {
    title: "بخش سوم: مدیریت بارگیری موترها",
    subtitle: "ثبت معلومات موتر، راننده، مسیر داخلی و هزینه‌های بارگیری.",
    fields: [
      { label: "شماره موتر", placeholder: "AFG-12345" },
      { label: "نام راننده", placeholder: "نام مکمل راننده" },
      { label: "شماره تماس راننده", placeholder: "+93 ..." },
      { label: "مسیر انتقال موتر", placeholder: "اسلام قلعه → هرات / کابل" },
      { label: "کرایه خط موتر", type: "number", placeholder: "0" },
      { label: "جر و خسارات احتمالی", type: "number", placeholder: "0" },
      { label: "هزینه لیفتراک", type: "number", placeholder: "0" },
      { label: "سایر مصارف بارگیری", type: "number", placeholder: "0" },
    ],
  },
  {
    title: "بخش چهارم: مدیریت حسابات مشتریان",
    subtitle: "ثبت مشتری، فاکتور، پرداخت‌ها، روزنامچه و بیلانس مشتری.",
    fields: [
      { label: "نام مشتری", placeholder: "نام مشتری / شرکت" },
      { label: "شماره تماس مشتری", placeholder: "+93 ..." },
      { label: "شماره فاکتور", placeholder: "INV-0001" },
      { label: "مبلغ صورتحساب", type: "number", placeholder: "0" },
      { label: "مبلغ پرداخت‌شده", type: "number", placeholder: "0" },
      { label: "بیلانس مشتری", type: "number", placeholder: "0" },
      { label: "وضعیت حساب", options: ["تصفیه شده", "بدهکار", "طلبکار", "در جریان"] },
      { label: "یادداشت روزنامچه حساب", placeholder: "جزئیات پرداخت، حواله یا باقیات", rows: 3, span: "full" },
    ],
  },
  {
    title: "بخش پنجم: مدیریت حسابات صرافی‌ها",
    subtitle: "ثبت حواله‌ها، دریافت، پرداخت و بیلانس صرافی‌های فعال.",
    fields: [
      { label: "نام صرافی", options: ["صرافی جلال آباد", "صرافی هرات", "سیف کابل"] },
      { label: "شماره حواله", placeholder: "HW-0001" },
      { label: "مبلغ دریافت", type: "number", placeholder: "0" },
      { label: "مبلغ پرداخت", type: "number", placeholder: "0" },
      { label: "بیلانس صرافی", type: "number", placeholder: "0" },
      { label: "تاریخ حواله", type: "date" },
    ],
  },
  {
    title: "بخش ششم: مدیریت حسابات مرزها",
    subtitle: "ثبت مرز، نمایندگی، وضعیت گمرک و مصارف مرزی.",
    fields: [
      { label: "شرکت / نمایندگی مرزی", options: ["شرکت وحدت اسلام قلعه", "روزنک", "مسلم فراه (ماهیرود)", "نیمروز", "حیرتان مزار شریف"] },
      { label: "نام مرز", options: ["اسلام قلعه", "روزنک", "فراه (ماهیرود)", "نیمروز", "حیرتان"] },
      { label: "وضعیت گمرکی", options: ["اسناد تسلیم شد", "در بررسی", "داخل گمرک", "ترخیص شد", "تاخیر دارد"] },
      { label: "مبلغ پرداخت مرزی", type: "number", placeholder: "0" },
      { label: "تاریخ آخرین آپدیت", type: "date" },
      { label: "یادداشت مرز / نمایندگی", placeholder: "جزئیات گمرک، تاخیر، اسناد یا پرداخت‌ها", rows: 3, span: "full" },
    ],
  },
  {
    title: "گزارش و بیلانس نهایی",
    subtitle: "خلاصه مالی برای گزارشات روزانه، هفتگی و ماهانه شرکت.",
    fields: [
      { label: "قیمت خرید کانتینر", type: "number", placeholder: "0" },
      { label: "قیمت فروش کانتینر", type: "number", placeholder: "0" },
      { label: "مجموع مصارف", type: "number", placeholder: "0" },
      { label: "مفاد / زیان تخمینی", type: "number", placeholder: "0" },
      { label: "نوع گزارش", options: ["روزانه", "هفتگی", "ماهانه"] },
      { label: "وضعیت مالی", options: ["کامل", "نیازمند بررسی", "در انتظار پرداخت", "بسته شده"] },
    ],
  },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const renderField = (field: Field) => (
  <label key={field.label} className={field.span === "full" ? "block md:col-span-2" : "block"}>
    <span className="text-sm font-semibold text-slate-700">{field.label}</span>
    {field.options ? (
      <select required className={inputClass} defaultValue="">
        <option value="" disabled>انتخاب کنید</option>
        {field.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : field.rows ? (
      <textarea required rows={field.rows} placeholder={field.placeholder} className={`${inputClass} resize-none`} />
    ) : (
      <input required type={field.type ?? "text"} placeholder={field.placeholder} className={inputClass} />
    )}
  </label>
);

const AddContainer = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => navigate("/containers"), 500);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-6">
      <PageHeader
        title="Create New Container Proposal"
        subtitle="پروپوزل سیستم مدیریت انتقالات کانتینر و حسابداری لوژستیکی"
      />

      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" dir="rtl">
          <div>
            <p className="text-sm font-bold text-blue-700">مقدمه</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">سیستم جامع مدیریت لوژستیک و حسابداری</h2>
            <p className="mt-3 leading-8 text-slate-600">
              این صفحه برای ثبت، پیگیری و مدیریت تمامی مراحل انتقالات تجارتی از کشورهای چین، هند و دبی تا افغانستان طراحی شده است؛
              شامل کانتینرها، موترهای باربری، هزینه‌ها، حسابات مشتریان، صرافی‌ها، مرزها و گزارشات مالی شرکت.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-900">اهداف پروژه</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              {objectives.map((objective) => (
                <li key={objective} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <form onSubmit={submit} className="space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" dir="rtl">
            <div className="mb-5 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-500">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {section.fields.map(renderField)}
            </div>
          </section>
        ))}

        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/containers")}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Container"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContainer;
