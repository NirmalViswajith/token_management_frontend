import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [dataa, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getTokenData");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  const newTicketsCount = dataa.filter((item) => item.status === "New").length;
  const urgentTicketCount = dataa.filter((item) => item.priority === 'High').length;
  const activeTicketCount = dataa.length;

  return (
    <div className="flex bg-green-500 text-white p-4">
      {renderTicketStatus("New Tickets", newTicketsCount, "green")}
      {renderTicketStatus("Urgent Tickets", urgentTicketCount, "red")}
      {renderTicketStatus("User Responded", 0, "yellow")}
      {renderTicketStatus("Active Tickets", activeTicketCount, "blue")}
    </div>
  );

  function renderTicketStatus(title, count, color) {
    return (
      <div className="flex-1 border-r-2 border-white p-4 flex items-center">
        <div className={`rounded-full border-3 border-white p-2 ml-5 mr-6 bg-white text-${color}-500`}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className="text-center text-2xl font-bold">
            <p>{count}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
