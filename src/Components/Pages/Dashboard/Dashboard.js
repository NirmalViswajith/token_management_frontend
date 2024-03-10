import Header from "./Header"
import TokenTable from "./TokenTable";
import ActiveTicketsTable from "./ActiveTicketsTable";
import PriorityGraph from "./Graph";
import StatusGraph from "./StatusGraph";

const DashBoard = () => {
  return (
    <>
      <Header />
      <TokenTable />
      <ActiveTicketsTable />
      <PriorityGraph />
    </>
  );
}

export default DashBoard;