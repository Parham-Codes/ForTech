import { BsPerson } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import UserSidebar from "../components/userPanelComponents/userSidebar";

function UserLayout() {

  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div className="userLayout">
      <div
        className={`userSidebar  ${isOpen ? "" : "userSidebarClosed"}`}
      >
        <UserSidebar toggle={() => setIsOpen(false)} />
      </div>
        
      <div className="userLayoutOutlet">
        <div className="userPanelHeader d-flex justify-content-between align-items-center py-2">
          <button onClick={() => setIsOpen(!isOpen)} className="btn">
            <RxHamburgerMenu size="25px" />
          </button>
          <div className="d-flex align-items-center ">
            <h4 className="m-0">خوش آمدی {user.name}</h4>
            <div className="border rounded-circle p-1 mx-3">
              <BsPerson className="" size="25px" />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
