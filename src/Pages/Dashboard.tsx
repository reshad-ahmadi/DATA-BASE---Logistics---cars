import { ProposalCoverage } from "./Dashboard/ProposalCoverage";
import { RouteAndOrders } from "./Dashboard/RouteAndOrders";
import { TransportBoard } from "./Dashboard/TransportBoard";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <ProposalCoverage />
      <TransportBoard />
      <RouteAndOrders />
    </div>
  );
};

export default Dashboard;
