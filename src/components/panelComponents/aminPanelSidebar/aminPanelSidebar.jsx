import { Link, NavLink, useNavigate } from "react-router-dom";
import "./aminPanelSidebar.css";
import { FaAngleLeft, FaBoxes } from "react-icons/fa";
import { BiCartAlt, BiHomeAlt2 } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { FaX } from "react-icons/fa6";
import { useAuth } from "../../../context/AuthContext";

function AdminPanelSidebar({ toggle }) {
  const { logout } = useAuth();

  const logoutEXitHandler = () => {
    logout()
  };

  return (
    <div className="adminSidebarInner">
      <div className="myPanelSidebar h-100">
        <div className="sidebarHeader panelTIcolor text-center border-bottom border-1 pt-2 position-relative">
          <h1 className="fs-2">Fortech</h1>
          <div
            onClick={toggle}
            className="menuResCloseBTn d-xxl-none position-absolute"
            style={{top: '10px' , left: '5px'}}
          >
            <FaX size='25px'/>
          </div>
        </div>
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="sidebarItems paneltTXcolor">
            <NavLink
              to="/admin/dashboard"
              className="py-2 px-2 text-decoration-none paneltTXcolor fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <BiHomeAlt2 className="me-1" size="25px" />
                داشبورد
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>

            <NavLink
              to="/admin/users"
              className="py-2 px-2 text-decoration-none paneltTXcolor fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <BsPeople className="me-1" size="25px" />
                کاربران
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>

            <NavLink
              to="/admin/products"
              className="py-2 px-2 text-decoration-none paneltTXcolor fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <BiCartAlt className="me-1" size="25px" />
                محصولات
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>

            <NavLink
              to="/admin/orders"
              className="py-2 px-2 text-decoration-none paneltTXcolor fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <FaBoxes className="me-1" size="25px" />
                سفارش ها
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>
          </div>
          <div className="mb-5 pb-3">
            <Link
              to="/"
              className="paneltTXcolor text-decoration-none cursorDefault"
            >
              <div className="bottomBTns py-2 px-2 text-decoration-none paneltTXcolor fs-6 d-flex align-items-center justify-content-between my-2 px-1 mx-2 rounded-3">
                بازگشت به صفحه اصلی سایت
              </div>
            </Link>

            <Link
              onClick={logoutEXitHandler}
              className="paneltTXcolor text-decoration-none cursorDefault"
            >
              <div className="bottomBTns py-2 px-2 text-decoration-none paneltTXcolor cursorDefault fs-6 d-flex align-items-center justify-content-between my-2 px-1 mx-2 rounded-3">
                خروج
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelSidebar;
