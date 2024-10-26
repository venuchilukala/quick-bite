import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Orders from "../pages/dashboard/Orders";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import Contact from "../pages/dashboard/Contact";
import YourQueries from "../pages/dashboard/YourQueries";
import AllTickets from "../pages/dashboard/admin/AllTickets";

const router = createBrowserRouter([
  //User Routes
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/queries",
        element: <YourQueries />,
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  //Admin Routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin-stats",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <ManageBookings />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`https://quick-bite-server-38rl.onrender.com/menu/${params.id}`),
      },
      {
        path: "all-tickets",
        element: <AllTickets/>
      }
      
    ],
  },
]);

export default router;
