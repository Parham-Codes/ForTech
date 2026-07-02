import { useState } from "react";
import AdminPanelSidebar from "../components/panelComponents/aminPanelSidebar/aminPanelSidebar";
import { Outlet } from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth()

  return (
    <div className="panelLayout">
      <div className={`adminSidebar  ${isOpen ? "" : "adminSidebarClosed"}`}>
        <AdminPanelSidebar toggle={() => setIsOpen(!isOpen)} />
      </div>

      <div className="panelLayoutOutlet">
        <div className="adminPanelHeader d-flex justify-content-between align-items-center py-2">
          <button onClick={() => setIsOpen(!isOpen)} className="btn">
            <RxHamburgerMenu className="paneltTXcolor" size="25px" />
          </button>
          <div className="d-flex align-items-center paneltTXcolor">
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

export default AdminLayout;
