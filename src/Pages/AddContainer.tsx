import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../Components/UI/PageHeader";
import { createContainerProposal } from "../api/services";

type Field = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  rows?: number;
  span?: "full";
  required?: boolean;
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
      { label: "نمبر کانتینر / Container No.", name: "container_number", placeholder: "MSKU-1234567", required: true },
      { label: "نمبر BL", name: "bl_number", placeholder: "BL-000000", required: true },
      { label: "کشور مبدا", name: "origin_country", options: ["چین", "هند", "دبی"], required: true },
      { label: "تاریخ بارگیری", name: "loading_date", type: "date", required: true },
      { label: "محل بارگیری", name: "loading_location", placeholder: "China Port / Dubai / India" },
      { label: "مسیر انتقال", name: "border_name", options: ["بندر عباس", "دوغارون", "اسلام قلعه", "روزنک", "فراه (ماهیرود)", "نیمروز", "حیرتان"] },
      { label: "وضعیت کانتینر", name: "current_status", options: ["بارگیری شده", "در مسیر", "داخل گمرک", "تخلیه شده", "تحویل مشتری"], required: true },
      { label: "مقصد نهایی", name: "destination", placeholder: "Herat / Kabul / Mazar / Customer warehouse" },
    ],
  },
  {
    title: "بخش دوم: مدیریت هزینه‌های کانتینر",
    subtitle: "ثبت تمام مصارف مستقیم کانتینر برای محاسبه قیمت تمام‌شده و مفاد.",
    fields: [
      { label: "هزینه گمرک", name: "customs_expense", type: "number", placeholder: "0" },
      { label: "هزینه کمیشن", name: "commission_expense", type: "number", placeholder: "0" },
      { label: "هزینه تخلیه و بارگیری", name: "unloading_expense", type: "number", placeholder: "0" },
      { label: "هزینه مرزی", name: "border_expense", type: "number", placeholder: "0" },
      { label: "هزینه جواز", name: "license_expense", type: "number", placeholder: "0" },
      { label: "سایر مصارف", name: "other_expense", type: "number", placeholder: "0" },
    ],
  },
  {
    title: "بخش سوم: مدیریت بارگیری موترها",
    subtitle: "ثبت معلومات موتر، راننده، مسیر داخلی و هزینه‌های بارگیری.",
    fields: [
      { label: "شماره موتر", name: "truck_number", placeholder: "AFG-12345" },
      { label: "نام راننده", name: "driver_name", placeholder: "نام مکمل راننده" },
      { label: "شماره تماس راننده", name: "driver_phone", placeholder: "+93 ..." },
      { label: "مسیر انتقال موتر", name: "truck_route", placeholder: "اسلام قلعه → هرات / کابل" },
      { label: "کرایه خط موتر", name: "truck_fare", type: "number", placeholder: "0" },
      { label: "جر و خسارات احتمالی", name: "truck_damage", type: "number", placeholder: "0" },
      { label: "هزینه لیفتراک", name: "forklift_expense", type: "number", placeholder: "0" },
      { label: "سایر مصارف بارگیری", name: "loading_other_expense", type: "number", placeholder: "0" },
    ],
  },
  {
    title: "بخش چهارم: مدیریت حسابات مشتریان",
    subtitle: "ثبت مشتری، فاکتور، پرداخت‌ها، روزنامچه و بیلانس مشتری.",
    fields: [
      { label: "نام مشتری", name: "customer_name", placeholder: "نام مشتری / شرکت", required: true },
      { label: "شماره تماس مشتری", name: "customer_phone", placeholder: "+93 ..." },
      { label: "شماره فاکتور", name: "invoice_number", placeholder: "INV-0001" },
      { label: "مبلغ صورتحساب", name: "invoice_amount", type: "number", placeholder: "0" },
      { label: "مبلغ پرداخت‌شده", name: "paid_amount", type: "number", placeholder: "0" },
      { label: "بیلانس مشتری", name: "customer_balance", type: "number", placeholder: "0" },
      { label: "وضعیت حساب", name: "account_status", options: ["تصفیه شده", "بدهکار", "طلبکار", "در جریان"] },
      { label: "یادداشت روزنامچه حساب", name: "account_notes", placeholder: "جزئیات پرداخت، حواله یا باقیات", rows: 3, span: "full" },
    ],
  },
  {
    title: "بخش پنجم: مدیریت حسابات صرافی‌ها",
    subtitle: "ثبت حواله‌ها، دریافت، پرداخت و بیلانس صرافی‌های فعال.",
    fields: [
      { label: "نام صرافی", name: "exchange_name", options: ["صرافی جلال آباد", "صرافی هرات", "سیف کابل"] },
      { label: "شماره حواله", name: "exchange_ref", placeholder: "HW-0001" },
      { label: "مبلغ دریافت", name: "exchange_received", type: "number", placeholder: "0" },
      { label: "مبلغ پرداخت", name: "exchange_paid", type: "number", placeholder: "0" },
      { label: "بیلانس صرافی", name: "exchange_balance", type: "number", placeholder: "0" },
      { label: "تاریخ حواله", name: "exchange_date", type: "date" },
    ],
  },
  {
    title: "بخش ششم: مدیریت حسابات مرزها",
    subtitle: "ثبت مرز، نمایندگی، وضعیت گمرک و مصارف مرزی.",
    fields: [
      { label: "شرکت / نمایندگی مرزی", name: "border_agency", options: ["شرکت وحدت اسلام قلعه", "روزنک", "مسلم فراه (ماهیرود)", "نیمروز", "حیرتان مزار شریف"] },
      { label: "نام مرز", name: "border_office", options: ["اسلام قلعه", "روزنک", "فراه (ماهیرود)", "نیمروز", "حیرتان"] },
      { label: "وضعیت گمرکی", name: "customs_status", options: ["اسناد تسلیم شد", "در بررسی", "داخل گمرک", "ترخیص شد", "تاخیر دارد"] },
      { label: "مبلغ پرداخت مرزی", name: "border_payment", type: "number", placeholder: "0" },
      { label: "تاریخ آخرین آپدیت", name: "border_update_date", type: "date" },
      { label: "یادداشت مرز / نمایندگی", name: "border_notes", placeholder: "جزئیات گمرک، تاخیر، اسناد یا پرداخت‌ها", rows: 3, span: "full" },
    ],
  },
  {
    title: "گزارش و بیلانس نهایی",
    subtitle: "خلاصه مالی برای گزارشات روزانه، هفتگی و ماهانه شرکت.",
    fields: [
      { label: "قیمت خرید کانتینر", name: "purchase_price", type: "number", placeholder: "0" },
      { label: "قیمت فروش کانتینر", name: "selling_price", type: "number", placeholder: "0" },
      { label: "مجموع مصارف", name: "total_expenses", type: "number", placeholder: "0" },
      { label: "مفاد / زیان تخمینی", name: "estimated_profit", type: "number", placeholder: "0" },
      { label: "نوع گزارش", name: "report_type", options: ["روزانه", "هفتگی", "ماهانه"] },
      { label: "وضعیت مالی", name: "financial_status", options: ["کامل", "نیازمند بررسی", "در انتظار پرداخت", "بسته شده"] },
    ],
  },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const renderField = (field: Field) => (
  <label key={field.name} className={field.span === "full" ? "block md:col-span-2" : "block"}>
    <span className="text-sm font-semibold text-slate-700">{field.label}</span>
    {field.options ? (
      <select name={field.name} required={field.required} className={inputClass} defaultValue="">
        <option value="" disabled>انتخاب کنید</option>
        {field.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : field.rows ? (
      <textarea name={field.name} required={field.required} rows={field.rows} placeholder={field.placeholder} className={`${inputClass} resize-none`} />
    ) : (
      <input name={field.name} required={field.required} type={field.type ?? "text"} placeholder={field.placeholder} className={inputClass} />
    )}
  </label>
);

const AddContainer = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const container = await createContainerProposal(new FormData(event.currentTarget));
      navigate(`/containers/${container.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save container");
    } finally {
      setSaving(false);
    }
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

        {error && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        )}

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
