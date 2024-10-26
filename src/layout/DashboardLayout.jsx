import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import logo from "/logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { RiCustomerService2Line } from "react-icons/ri";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaShoppingCart /> Menu
      </Link>
    </li>
    <li>
      <Link to="/orders">
        <FaLocationArrow /> Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/contact">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
            {/* Page content here */}
            <div className="flex justify-between items-center mx-4 mt-5">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button sm:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button className="btn rounded-full bg-green text-white px-6 sm:hidden">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-8 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3 gap-4">
                  <img src={logo} alt="" className="w-24" />
                  <div className="badge badge-primary">Admin</div>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="admin-stats">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="bookings">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle /> Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li >
                <Link to="/dashboard/users">
                  <FaUsers /> All Users
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/all-tickets">
                  <RiCustomerService2Line /> All Tickets
                </Link>
              </li>
              <hr />
              {/* Shared nav Links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
