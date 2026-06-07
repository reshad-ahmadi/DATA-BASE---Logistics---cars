import type {
  ApiBorderBalance,
  ApiBorderExpense,
  ApiBorderTransaction,
  ApiContainer,
  ApiContainerExpense,
  ApiContainerExpenseReport,
  ApiContainerRoute,
  ApiContainerSummary,
  ApiCustomer,
  ApiCustomerBalance,
  ApiExchangeBalance,
  ApiExchangeTransaction,
  ApiTruck,
  ApiTruckExpense,
} from "./types";

export type ContainerRow = {
  id: string;
  containerNo: string;
  blNo: string;
  origin: string;
  destination: string;
  status: string;
  loadDate: string;
  customer: string;
  purchasePrice: number;
  sellingPrice: number;
};

export type CustomerRow = {
  id: string;
  name: string;
  nameDA: string;
  phone: string;
  containers: number;
  totalPurchase: number;
  totalSales: number;
  balance: number;
};

export type ExpenseRow = {
  id: string;
  category: string;
  categoryDA: string;
  container: string;
  amount: number;
  date: string;
  paidTo: string;
};

export type ExchangeRow = {
  id: string;
  exchangeName: string;
  exchangeNameDA: string;
  date: string;
  type: "incoming" | "outgoing";
  sourceAmount: number;
  sourceCurrency: "USD" | "AFN" | "PKR" | "IRR";
  targetAmount: number;
  targetCurrency: "USD" | "AFN" | "PKR" | "IRR";
  rate: number;
  status: "completed" | "pending";
  notes: string;
  notesDA: string;
};

export type BorderRow = {
  id: string;
  companyName: string;
  companyNameDA: string;
  borderName: string;
  borderNameDA: string;
  containersCount: number;
  status: "Loading" | "Customs Entry" | "Cleared" | "Delayed";
  totalFees: number;
  lastUpdate: string;
  notes: string;
  notesDA: string;
};

const formatDate = (value?: string | null) =>
  value ? new Date(value).toISOString().slice(0, 10) : "—";

const toNumber = (value: string | number | null | undefined) => Number(value ?? 0);

const routeDestination = (routes: ApiContainerRoute[], containerId: string) =>
  routes.find((route) => route.container_id === containerId)?.border_name ?? "Afghanistan";

export const mapContainerSummary = (
  row: ApiContainerSummary,
  routes: ApiContainerRoute[] = [],
): ContainerRow => ({
  id: row.container_id,
  containerNo: row.container_number,
  blNo: row.bl_number,
  origin: row.origin_country,
  destination: routeDestination(routes, row.container_id),
  status: row.current_status,
  loadDate: formatDate(row.loading_date),
  customer: row.customer_name ?? "—",
  purchasePrice: 0,
  sellingPrice: 0,
});

export const mapContainer = (
  row: ApiContainer,
  customerName = "—",
  routes: ApiContainerRoute[] = [],
): ContainerRow => ({
  id: row.id,
  containerNo: row.container_number,
  blNo: row.bl_number,
  origin: row.origin_country,
  destination: routeDestination(routes, row.id),
  status: row.current_status,
  loadDate: formatDate(row.loading_date),
  customer: customerName,
  purchasePrice: 0,
  sellingPrice: 0,
});

export const mapContainerExpenseReport = (row: ApiContainerExpenseReport): ContainerRow => ({
  id: row.container_id,
  containerNo: row.container_number,
  blNo: row.bl_number,
  origin: row.origin_country,
  destination: "Afghanistan",
  status: row.current_status,
  loadDate: "—",
  customer: row.customer_name ?? "—",
  purchasePrice: toNumber(row.total_expense),
  sellingPrice: 0,
});

export const mapCustomerBalance = (
  row: ApiCustomerBalance,
  customers: ApiCustomer[],
  containerCounts: Record<string, number>,
): CustomerRow => {
  const customer = customers.find((item) => item.id === row.customer_id);
  return {
    id: row.customer_id,
    name: row.customer_name,
    nameDA: row.company_name ?? row.customer_name,
    phone: customer?.phone ?? "—",
    containers: containerCounts[row.customer_id] ?? 0,
    totalPurchase: toNumber(row.total_paid),
    totalSales: toNumber(row.total_invoiced),
    balance: toNumber(row.balance),
  };
};

export const mapContainerExpense = (
  row: ApiContainerExpense,
  containerMap: Record<string, string>,
): ExpenseRow => ({
  id: row.id,
  category: row.expense_type,
  categoryDA: row.expense_type,
  container: containerMap[row.container_id] ?? row.container_id,
  amount: toNumber(row.amount),
  date: formatDate(row.expense_date),
  paidTo: row.description ?? "—",
});

export const mapTruckExpense = (
  row: ApiTruckExpense,
  truckMap: Record<string, string>,
): ExpenseRow => ({
  id: row.id,
  category: row.expense_type,
  categoryDA: row.expense_type,
  container: truckMap[row.truck_id] ?? row.truck_id,
  amount: toNumber(row.amount),
  date: formatDate(row.expense_date),
  paidTo: "Truck expense",
});

export const mapBorderExpense = (
  row: ApiBorderExpense,
  containerMap: Record<string, string>,
): ExpenseRow => ({
  id: row.id,
  category: row.expense_type,
  categoryDA: row.expense_type,
  container: row.container_id ? containerMap[row.container_id] ?? row.container_id : "—",
  amount: toNumber(row.amount),
  date: formatDate(row.expense_date),
  paidTo: row.description ?? "Border expense",
});

export const mapExchangeTransaction = (
  row: ApiExchangeTransaction,
  officeMap: Record<string, string>,
): ExchangeRow => {
  const office = officeMap[row.office_id] ?? row.office_id;
  const type = row.transaction_type.toLowerCase().includes("in") ? "incoming" : "outgoing";
  const currency = (row.currency ?? "USD") as ExchangeRow["sourceCurrency"];
  return {
    id: row.id,
    exchangeName: office,
    exchangeNameDA: office,
    date: formatDate(row.transaction_date),
    type,
    sourceAmount: toNumber(row.amount),
    sourceCurrency: currency,
    targetAmount: toNumber(row.amount),
    targetCurrency: currency,
    rate: 1,
    status: "completed",
    notes: row.notes ?? "",
    notesDA: row.notes ?? "",
  };
};

export const mapBorderBalance = (row: ApiBorderBalance): BorderRow => ({
  id: row.border_id,
  companyName: row.office_name,
  companyNameDA: row.office_name,
  borderName: row.office_name,
  borderNameDA: row.office_name,
  containersCount: 0,
  status: toNumber(row.balance) < 0 ? "Delayed" : "Customs Entry",
  totalFees: toNumber(row.total_expenses),
  lastUpdate: "—",
  notes: `Payments: ${row.total_payments} | Balance: ${row.balance}`,
  notesDA: `پرداخت‌ها: ${row.total_payments} | بیلانس: ${row.balance}`,
});

export const mapBorderTransaction = (
  row: ApiBorderTransaction,
  borderMap: Record<string, string>,
): BorderRow => ({
  id: row.id,
  companyName: borderMap[row.border_id] ?? row.border_id,
  companyNameDA: borderMap[row.border_id] ?? row.border_id,
  borderName: borderMap[row.border_id] ?? row.border_id,
  borderNameDA: borderMap[row.border_id] ?? row.border_id,
  containersCount: 0,
  status: "Customs Entry",
  totalFees: toNumber(row.amount),
  lastUpdate: formatDate(row.transaction_date),
  notes: row.description ?? "",
  notesDA: row.description ?? "",
});

export const mapTruckRow = (row: ApiTruck): ExpenseRow => ({
  id: row.id,
  category: "Truck",
  categoryDA: "موتر",
  container: row.truck_number,
  amount: 0,
  date: formatDate(row.created_at),
  paidTo: row.driver_id ?? "—",
});

export const officeMapFromBalances = (rows: ApiExchangeBalance[]) =>
  Object.fromEntries(rows.map((row) => [row.office_id, row.office_name]));

export const borderMapFromBalances = (rows: ApiBorderBalance[]) =>
  Object.fromEntries(rows.map((row) => [row.border_id, row.office_name]));

export const containerMapFromSummaries = (rows: ApiContainerSummary[]) =>
  Object.fromEntries(rows.map((row) => [row.container_id, row.container_number]));
