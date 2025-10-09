import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import data from "../teste.json";

export const options = {
  isStacked: true,
  height: 300,
  legend: { position: "top", maxLines: 3 },
  vAxis: { minValue: 0 },
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-yellow-200 to-amber-300 py-10 px-4">
      <div className="flex justify-center items-center mb-6 w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center space-x-4 p-3 bg-white shadow-xl rounded-lg w-full">
          <h1 className="text-2xl md:text-3xl font-extrabold text-amber-800">
            📊 Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Desempenho Mensal
        </h2>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Dashboard;
