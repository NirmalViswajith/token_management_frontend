import { useEffect, useState } from "react";
import axios from "axios";
import AddForm from "./Form";

const TokenTable = () => {
const [tableData, setTableData] = useState([]);
const [addForm, setAddForm] = useState(false);
const openFormClick = () => {
  setAddForm(true);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getTokenData");
        console.log(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  const totalTickets = tableData.length;
  const importantOpenTicketsCount = tableData.filter(
    (item) =>
      (item.priority === "High" || item.priority === "Medium") &&
      item.status !== "Closed"
  ).length;
  const assignedTicketsCount = tableData.filter((item) =>item.status === "Assigned").length;
  const newTicketsCount = tableData.filter((item) =>item.status === "New").length;
  const closedTicketsCount = tableData.filter((item) =>item.status === "Closed").length;
  return (
    <div className="d-flex">
      <div className="col-md-6 border-2 ">
        <div className="bg-blue-400 text-white" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h6 className="ml-2 mt-2">last tickets</h6>
          </div>
          <div className="bg-blue-400 text-white  mr-2 text-2xl">
            <button onClick={openFormClick}>+</button>
          </div>
        </div>
        {addForm && <AddForm fromVisibility={setAddForm} />}
        <div style={{ maxHeight: "250px", overflowY: "auto", overflowX: "hidden" }} className="table-container ml-2 mt-6 pr-3">

          <table className="table table-bordered table-hover">
            <thead style={{ position: "", top: '0' }} className="thead-dark">
              <tr>
                <th>id</th>
                <th>servicename</th>
                <th>priority</th>
                <th>status</th>
                <th>creation date</th>
                <th>last updated</th>
                <th>assignedto</th>
              </tr>
            </thead>
            <tbody className="">
              {tableData &&
                tableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Id}</td>
                    <td>{item.service}</td>
                    <td>{item.priority}</td>
                    <td>{item.status}</td>
                    <td>{new Date(item.reportedDate).toLocaleDateString()}</td>
                    <td>{new Date(item.updatedDate).toLocaleDateString()}</td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-6 border-2 ">
        <div className="bg-blue-400 text-white " style={{paddingBottom:'1px',paddingTop:'6px'}}>
          <h6 className=" ml-2">Active tickets</h6>
        </div>
        <div className="ml-2 mt-3 mb-2 mr-3 p-4">
          <table className="table table-bordered">
            <tbody>
              <tr>

                <td>Total tickets</td>
                <td>{totalTickets}</td>
              </tr>
              <tr>
                <td>Important tickets</td>
                <td>{importantOpenTicketsCount}</td>
              </tr>
              <tr>
                <td>Assigned tickets</td>
                <td>{assignedTicketsCount}</td>
              </tr>
              <tr>
                <td>New tickets</td>
                <td>{newTicketsCount}</td>
              </tr>
              <tr>
                <td>Closed tickets</td>
                <td>{closedTicketsCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
