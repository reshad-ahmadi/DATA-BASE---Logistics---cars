import { apiRequest } from "./client";
import {
  mapBorderBalance,
  mapBorderExpense,
  mapBorderTransaction,
  mapContainer,
  mapContainerExpense,
  mapContainerExpenseReport,
  mapContainerSummary,
  mapCustomerBalance,
  mapExchangeTransaction,
  mapTruckExpense,
  mapTruckRow,
  borderMapFromBalances,
  containerMapFromSummaries,
  officeMapFromBalances,
  type BorderRow,
  type ContainerRow,
  type CustomerRow,
  type ExchangeRow,
  type ExpenseRow,
} from "./mappers";
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
  ApiGeneralBalance,
  ApiProfitLoss,
  ApiTruck,
  ApiTruckExpense,
  LoginResponse,
} from "./types";

export const authApi = {
  login: (username: string, password: string) =>
    apiRequest<LoginResponse>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) },
      false,
    ),
  logout: () => apiRequest<{ message: string }>("/auth/logout", { method: "POST" }),
};

export const containersApi = {
  list: () => apiRequest<ApiContainer[]>("/containers"),
  get: (id: string) => apiRequest<ApiContainer>(`/containers/${id}`),
  create: (body: Record<string, unknown>) =>
    apiRequest<ApiContainer>("/containers", { method: "POST", body: JSON.stringify(body) }),
  summary: () => apiRequest<ApiContainerSummary[]>("/reports/containerSummary"),
  expenseReport: () => apiRequest<ApiContainerExpenseReport[]>("/reports/containers"),
  routes: () => apiRequest<ApiContainerRoute[]>("/operations/container-routes"),
  createRoute: (body: Record<string, unknown>) =>
    apiRequest("/operations/container-routes", { method: "POST", body: JSON.stringify(body) }),
};

export const customersApi = {
  list: () => apiRequest<ApiCustomer[]>("/customers"),
  create: (body: Record<string, unknown>) =>
    apiRequest<ApiCustomer>("/customers", { method: "POST", body: JSON.stringify(body) }),
  balances: () => apiRequest<ApiCustomerBalance[]>("/reports/customers"),
};

export const expensesApi = {
  containers: () => apiRequest<ApiContainerExpense[]>("/expenses/containers"),
  trucks: () => apiRequest<ApiTruckExpense[]>("/expenses/trucks"),
  borders: () => apiRequest<ApiBorderExpense[]>("/expenses/borders"),
  createContainer: (body: Record<string, unknown>) =>
    apiRequest("/expenses/containers", { method: "POST", body: JSON.stringify(body) }),
  createTruck: (body: Record<string, unknown>) =>
    apiRequest("/expenses/trucks", { method: "POST", body: JSON.stringify(body) }),
  createBorder: (body: Record<string, unknown>) =>
    apiRequest("/expenses/borders", { method: "POST", body: JSON.stringify(body) }),
};

export const trucksApi = {
  list: () => apiRequest<ApiTruck[]>("/trucks"),
  create: (body: Record<string, unknown>) =>
    apiRequest<ApiTruck>("/trucks", { method: "POST", body: JSON.stringify(body) }),
};

export const exchangeApi = {
  list: () => apiRequest<ApiExchangeTransaction[]>("/exchange"),
  balances: () => apiRequest<ApiExchangeBalance[]>("/reports/exchange"),
};

export const borderApi = {
  list: () => apiRequest<ApiBorderTransaction[]>("/border"),
  balances: () => apiRequest<ApiBorderBalance[]>("/reports/border"),
};

export const reportsApi = {
  names: () => apiRequest<string[]>("/reports"),
  get: <T>(name: string) => apiRequest<T>(`/reports/${name}`),
  generalBalance: () => apiRequest<ApiGeneralBalance[]>("/reports/generalBalance"),
  profitLoss: () => apiRequest<ApiProfitLoss[]>("/reports/profitLoss"),
};

export async function fetchContainerRows(): Promise<ContainerRow[]> {
  const [summary, routes] = await Promise.all([
    containersApi.summary(),
    containersApi.routes(),
  ]);
  return summary.map((row) => mapContainerSummary(row, routes));
}

export async function fetchCustomerRows(): Promise<CustomerRow[]> {
  const [balances, customers, containers] = await Promise.all([
    customersApi.balances(),
    customersApi.list(),
    containersApi.list(),
  ]);
  const containerCounts = containers.reduce<Record<string, number>>((acc, row) => {
    if (row.customer_id) acc[row.customer_id] = (acc[row.customer_id] ?? 0) + 1;
    return acc;
  }, {});
  return balances.map((row) => mapCustomerBalance(row, customers, containerCounts));
}

export async function fetchCostRows(): Promise<ExpenseRow[]> {
  const [expenses, summary] = await Promise.all([
    expensesApi.containers(),
    containersApi.summary(),
  ]);
  const containerMap = containerMapFromSummaries(summary);
  return expenses.map((row) => mapContainerExpense(row, containerMap));
}

export async function fetchExpenseRows(): Promise<ExpenseRow[]> {
  const [containerExpenses, truckExpenses, borderExpenses, summary] = await Promise.all([
    expensesApi.containers(),
    expensesApi.trucks(),
    expensesApi.borders(),
    containersApi.summary(),
  ]);
  const containerMap = containerMapFromSummaries(summary);
  return [
    ...containerExpenses.map((row) => mapContainerExpense(row, containerMap)),
    ...truckExpenses.map((row) => mapTruckExpense(row, {})),
    ...borderExpenses.map((row) => mapBorderExpense(row, containerMap)),
  ];
}

export async function fetchExchangeRows(): Promise<ExchangeRow[]> {
  const [transactions, balances] = await Promise.all([
    exchangeApi.list(),
    exchangeApi.balances(),
  ]);
  const officeMap = officeMapFromBalances(balances);
  return transactions.map((row) => mapExchangeTransaction(row, officeMap));
}

export async function fetchBorderRows(): Promise<BorderRow[]> {
  const balances = await borderApi.balances();
  if (balances.length) return balances.map(mapBorderBalance);
  const [transactions, balanceRows] = await Promise.all([
    borderApi.list(),
    borderApi.balances(),
  ]);
  const borderMap = borderMapFromBalances(balanceRows);
  return transactions.map((row) => mapBorderTransaction(row, borderMap));
}

export async function fetchContainerById(id: string): Promise<ContainerRow | null> {
  const [container, customers, routes, expenseReport] = await Promise.all([
    containersApi.get(id),
    customersApi.list(),
    containersApi.routes(),
    containersApi.expenseReport(),
  ]);
  const customer = customers.find((row) => row.id === container.customer_id);
  const report = expenseReport.find((row) => row.container_id === id);
  const mapped = mapContainer(container, customer?.customer_name ?? "—", routes);
  if (report) {
    mapped.purchasePrice = Number(report.total_expense ?? 0);
  }
  return mapped;
}

export async function fetchSpecRows(): Promise<ContainerRow[]> {
  const report = await containersApi.expenseReport();
  return report.map(mapContainerExpenseReport);
}

export async function fetchTruckRows(): Promise<ExpenseRow[]> {
  const [trucks, truckExpenses] = await Promise.all([
    trucksApi.list(),
    expensesApi.trucks(),
  ]);
  const truckMap = Object.fromEntries(trucks.map((row) => [row.id, row.truck_number]));
  if (truckExpenses.length) {
    return truckExpenses.map((row) => mapTruckExpense(row, truckMap));
  }
  return trucks.map(mapTruckRow);
}

export type ReportStats = {
  revenue: number;
  expenses: number;
  netProfit: number;
  containersYtd: number;
  cards: string[];
};

export async function fetchReportStats(): Promise<ReportStats> {
  const [profitLoss, containers, reportNames] = await Promise.all([
    reportsApi.profitLoss(),
    containersApi.list(),
    reportsApi.names(),
  ]);
  const pl = profitLoss[0];
  const revenue = Number(pl?.revenue ?? 0);
  const expenses =
    Number(pl?.container_expenses ?? 0) +
    Number(pl?.truck_expenses ?? 0) +
    Number(pl?.border_expenses ?? 0) +
    Number(pl?.ledger_expenses ?? 0);
  const netProfit = Number(pl?.net_profit ?? 0);

  return {
    revenue,
    expenses,
    netProfit,
    containersYtd: containers.length,
    cards: reportNames.map((name) => `Report: ${name}`),
  };
}

const originMap: Record<string, string> = {
  چین: "China",
  هند: "India",
  دبی: "Dubai",
};

const statusMap: Record<string, string> = {
  "بارگیری شده": "Loaded",
  "در مسیر": "In Transit",
  "داخل گمرک": "Customs",
  "تخلیه شده": "Unloaded",
  "تحویل مشتری": "Delivered",
};

export async function createContainerProposal(form: FormData) {
  const container_number = String(form.get("container_number") ?? "").trim();
  const bl_number = String(form.get("bl_number") ?? "").trim();
  const origin_country =
    originMap[String(form.get("origin_country") ?? "")] ?? String(form.get("origin_country") ?? "China");
  const loading_date = String(form.get("loading_date") ?? new Date().toISOString().slice(0, 10));
  const current_status =
    statusMap[String(form.get("current_status") ?? "")] ?? String(form.get("current_status") ?? "Loaded");

  const customerName = String(form.get("customer_name") ?? "").trim();
  if (!customerName) {
    throw new Error("Customer name is required. Fill in section 4 (نام مشتری).");
  }

  let customer_id: string | null = null;
  if (customerName) {
    const customers = await customersApi.list();
    const existing = customers.find((row) => row.customer_name === customerName);
    if (existing) {
      customer_id = existing.id;
    } else {
      const created = await customersApi.create({
        customer_name: customerName,
        phone: String(form.get("customer_phone") ?? ""),
        company_name: customerName,
      });
      customer_id = created.id;
    }
  }

  const container = await containersApi.create({
    container_number,
    bl_number,
    origin_country,
    loading_date,
    current_status,
    customer_id,
  });

  const border_name = String(form.get("border_name") ?? "").trim();
  if (border_name) {
    await containersApi.createRoute({
      container_id: container.id,
      border_name,
      remarks: String(form.get("destination") ?? ""),
    });
  }

  const expenseFields: Array<[string, string]> = [
    ["customs_expense", "Customs"],
    ["commission_expense", "Commission"],
    ["unloading_expense", "Loading"],
    ["border_expense", "Border Fee"],
    ["license_expense", "License"],
    ["other_expense", "Other"],
  ];

  for (const [field, expense_type] of expenseFields) {
    const amount = Number(form.get(field) ?? 0);
    if (amount > 0) {
      await expensesApi.createContainer({
        container_id: container.id,
        expense_type,
        amount,
        expense_date: loading_date,
        description: expense_type,
      });
    }
  }

  const truck_number = String(form.get("truck_number") ?? "").trim();
  if (truck_number) {
    const truck = await trucksApi.create({ truck_number });
    const truckFare = Number(form.get("truck_fare") ?? 0);
    if (truckFare > 0) {
      await expensesApi.createTruck({
        truck_id: truck.id,
        expense_type: "Transport Fee",
        amount: truckFare,
        expense_date: loading_date,
      });
    }
  }

  return container;
}
