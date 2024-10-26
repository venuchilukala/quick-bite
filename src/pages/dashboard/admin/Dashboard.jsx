// import React from "react";
// import { FaRupeeSign, FaUsers } from "react-icons/fa";
// import { BiSolidFoodMenu } from "react-icons/bi";
// import { GiStabbedNote } from "react-icons/gi";
// import { TfiStatsUp } from "react-icons/tfi";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: stats = [] } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin-stats");
//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <div className="stats shadow flex flex-col md:flex-row ">
//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <TfiStatsUp className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Revenue</div>
//           <div className="stat-value flex">
//             <FaRupeeSign /> <span>{stats.revenue}</span>
//           </div>
//           <div className="stat-desc">Jan 1st - Feb 1st</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <FaUsers className="w-8 h-8" />
//           </div>
//           <div className="stat-title">New Users</div>
//           <div className="stat-value">{stats.users}</div>
//           <div className="stat-desc">↗︎ 400 (22%)</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <BiSolidFoodMenu className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Menu Items</div>
//           <div className="stat-value">{stats.menuItems}</div>
//           <div className="stat-desc">↗︎ 400 (22%)</div>
//         </div>

//         <div className="stat">
//           <div className="stat-figure text-secondary">
//             <GiStabbedNote className="w-8 h-8" />
//           </div>
//           <div className="stat-title">Orders</div>
//           <div className="stat-value">{stats.orders}</div>
//           <div className="stat-desc">↘︎ 90 (14%)</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { FaRupeeSign, FaUsers } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { GiStabbedNote } from "react-icons/gi";
import { TfiStatsUp } from "react-icons/tfi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useMenu from "../../../hooks/useMenu";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useAuth();
  const menu = useMenu();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Sample data for the bar chart
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Function to calculate pie chart data based on menu categories
  const pieData = () => {
    const categoryCounts = {};

    // Count occurrences of each category
    menu[0].forEach((item) => {
      const category = item.category; // Ensure 'category' exists in your data structure
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div>
      <h2 className=" text-2xl font-semibold my-4">
        Sales <span className="text-green ">Overview</span>
      </h2>
      {/* <div className="stats shadow flex flex-col md:flex-row p-6 bg-gray-100">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <TfiStatsUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value flex">
            <FaRupeeSign /> <span>{stats.revenue}</span>
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="w-8 h-8" />
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <BiSolidFoodMenu className="w-8 h-8" />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiStabbedNote className="w-8 h-8" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div> */}

      <div className="stats shadow flex flex-col md:flex-row p-6 bg-gray-100">
        <div className="stat bg-orange-100 shadow-md rounded-lg p-4 mx-2 my-2">
          <div className="stat-figure text-secondary">
            <TfiStatsUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value flex">
            <FaRupeeSign /> <span>{stats.revenue}</span>
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-blue-100 shadow-md rounded-lg p-4 mx-2 my-2">
          <div className="stat-figure text-secondary">
            <FaUsers className="w-8 h-8" />
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-rose-100 shadow-md rounded-lg p-4 mx-2 my-2">
          <div className="stat-figure text-secondary">
            <BiSolidFoodMenu className="w-8 h-8" />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-purple-100 shadow-md rounded-lg p-4 mx-2 my-2">
          <div className="stat-figure text-secondary">
            <GiStabbedNote className="w-8 h-8" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="p-6">
        <h2 className=" text-2xl font-semibold my-4">
          Sales <span className="text-green ">Overview</span>
        </h2>
        <div style={{ width: "100%", maxWidth: "600px", height: "400px" }}>
          <Bar
            data={barData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className=" text-2xl font-semibold my-4">
          Menu Items <span className="text-green ">Distribution</span>
        </h2>

        <div style={{ width: "100%", maxWidth: "600px", height: "400px" }}>
          <Pie
            data={pieData()}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
