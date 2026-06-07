export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type ApiCustomer = {
  id: string;
  customer_name: string;
  phone: string | null;
  address: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiContainer = {
  id: string;
  container_number: string;
  bl_number: string;
  origin_country: string;
  loading_date: string;
  current_status: string;
  customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiContainerSummary = {
  container_id: string;
  container_number: string;
  bl_number: string;
  origin_country: string;
  loading_date: string;
  current_status: string;
  customer_name: string | null;
  last_tracking_at: string | null;
};

export type ApiCustomerBalance = {
  customer_id: string;
  customer_name: string;
  company_name: string | null;
  opening_balance: string;
  total_invoiced: string;
  total_paid: string;
  manual_debits: string;
  manual_credits: string;
  balance: string;
};

export type ApiContainerExpense = {
  id: string;
  container_id: string;
  expense_type: string;
  amount: string | number;
  expense_date: string;
  description: string | null;
};

export type ApiTruckExpense = {
  id: string;
  truck_id: string;
  expense_type: string;
  amount: string | number;
  expense_date: string;
};

export type ApiBorderExpense = {
  id: string;
  border_id: string;
  container_id: string | null;
  expense_type: string;
  amount: string | number;
  expense_date: string;
  description: string | null;
};

export type ApiExchangeTransaction = {
  id: string;
  office_id: string;
  transaction_type: string;
  amount: string | number;
  currency: string | null;
  transaction_date: string;
  notes: string | null;
};

export type ApiBorderTransaction = {
  id: string;
  border_id: string;
  transaction_type: string;
  amount: string | number;
  description: string | null;
  transaction_date: string;
};

export type ApiTruck = {
  id: string;
  truck_number: string;
  driver_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ApiContainerRoute = {
  id: string;
  container_id: string;
  border_name: string;
  arrival_date: string | null;
  departure_date: string | null;
  remarks: string | null;
};

export type ApiGeneralBalance = {
  customer_receivables: string;
  total_cash_received: string;
  exchange_balance: string;
  border_balance: string;
  ledger_balance: string;
  net_profit: string;
};

export type ApiProfitLoss = {
  revenue: string;
  container_expenses: string;
  truck_expenses: string;
  border_expenses: string;
  ledger_expenses: string;
  ledger_revenue: string;
  net_profit: string;
};

export type ApiExchangeBalance = {
  office_id: string;
  office_name: string;
  currency: string | null;
  total_received: string;
  total_sent: string;
  balance: string;
};

export type ApiBorderBalance = {
  border_id: string;
  office_name: string;
  total_payments: string;
  total_expenses: string;
  balance: string;
};

export type ApiContainerExpenseReport = {
  container_id: string;
  container_number: string;
  bl_number: string;
  origin_country: string;
  current_status: string;
  customer_name: string | null;
  total_expense: string;
};
