import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaPenAlt,
} from "react-icons/fa";

const DashboardSidebarContent = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("USER Object data:=", user);
  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <div className="p-4">
      {/* User Profile Info */}
      <div className="flex flex-row lg:flex-col items-start gap-2">
        <img
          src={user?.photoUrl}
          alt="User Profile"
          className="w-16 rounded-full"
        />
        <span>{user?.displayName}</span>
        <span className="text-xs">{user?.email}</span>
      </div>
      <hr className="my-4" />


      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4">
        {/* Profile Link */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <FaUser className="inline mr-2" />
          পরিচিতি
        </NavLink>

        {!user?.isBlocked && (
          <>
            {" "}
            {/* Admin Links */}
            {user?.isAdmin && (
              <>
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaUsers className="inline mr-2" />
                  ব্যবহারকারীগণ
                </NavLink>

               
                 <NavLink
                  to="/dashboard/addBenefits"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  উপকারের ধরন যুক্তকরুন
                </NavLink>
               
                <NavLink
                  to="/dashboard/addProjects"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  প্রকল্প যুক্তকরুন
                </NavLink>

                <NavLink
                  to="/dashboard/addBeneficiaries"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  উপকারভোগী যুক্তকরুন
                </NavLink>
              
                <NavLink
                  to="/dashboard/loadBenefits"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  উপকারের ধরন তালিকা
                </NavLink>

                <NavLink
                  to="/dashboard/loadBeneficiaries"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  উপকারভোগী তালিকা
                </NavLink>
                <NavLink
                  to="/dashboard/loadProjects"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  প্রকল্প তালিকা
                </NavLink>

                <NavLink
                  to="/dashboard/createMessage"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaPenAlt className="inline mr-2" />
                  Create Message
                </NavLink>
              </>
            )}
            {/* User Links */}
            {!user?.isAdmin && (
              <NavLink
                to="/dashboard/messages"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }
              >
                <FaEnvelope className="inline mr-2" />
                Messages
              </NavLink>
            )}
          </>
        )}
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-600 text-sm hover:underline flex items-center"
        >
          <FaSignOutAlt className="inline mr-2" />
          লগআউট
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebarContent;
