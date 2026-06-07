import { OrderList } from "./OrderList";
import { RoutePanel } from "./RoutePanel";

export const RouteAndOrders = () => (
  <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.6fr]">
    <RoutePanel />
    <OrderList />
  </section>
);
