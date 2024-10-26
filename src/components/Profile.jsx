import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { user } = props;
  const {logOut} = useContext(AuthContext)

  const location  = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"

  const handleLogout = () =>{
    logOut().then(()=>{
      alert("Account Logged out")
      // document.getElementById("my_modal_5").close()
      navigate(from, {replace : true})
      
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  return (
    <div>
      <div className="drawer drawer-end z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://th.bing.com/th/id/OIP.H3mX3rpQDrVXLOFxWMD0dAHaHa?w=219&h=218&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to="/dashboard/admin-stats">Dashboard</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
