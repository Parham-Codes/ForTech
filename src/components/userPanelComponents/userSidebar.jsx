import "./userSidebar.css";
import { Link, NavLink } from "react-router-dom";
import { FaAngleLeft, FaBoxes } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { FaX } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { BsPen } from "react-icons/bs";

function UserSidebar({ toggle }) {

  const { logout } = useAuth()

  const logoutEXitHandler = () => {
    logout();
  };

  return (
    <div className="userSidebarInner">
      <div className="userPanelSidebar h-100">
        <div className="sidebarHeader text-center border-bottom border-1 pt-2 position-relative">
          <h1 className="fs-2">Fortech</h1>
          <div
            onClick={toggle}
            className="menuResCloseBTn d-xxl-none position-absolute"
            style={{ top: "10px", left: "5px" }}
          >
            <FaX size="25px" />
          </div>
        </div>
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="sidebarItems text-black">
            <NavLink
              to="/user/orders"
              className="py-2 px-2 text-decoration-none text-black fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <FaBoxes className="me-1" size="25px" />
                سفارش های من
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>

            <NavLink
              to="/user/edit"
              className="py-2 px-2 text-decoration-none text-black fs-6 d-flex align-items-center justify-content-between my-4 px-1 mx-2 rounded-3"
            >
              <div className="">
                <BsPen className="me-1" size="25px" />
                ویرایش اطلاعات
              </div>
              <FaAngleLeft size="25px" />
            </NavLink>

            
          </div>
          <div className="mb-5 pb-3">
            <Link
              to="/"
              className="text-black text-decoration-none cursorDefault"
            >
              <div className="bottomBTns py-2 px-2 text-decoration-none text-black fs-6 d-flex align-items-center justify-content-between my-2 px-1 mx-2 rounded-3">
                بازگشت به صفحه اصلی سایت
              </div>
            </Link>

            <Link
              onClick={logoutEXitHandler}
              className="text-black text-decoration-none cursorDefault"
            >
              <div className="bottomBTns py-2 px-2 text-decoration-none text-black cursorDefault fs-6 d-flex align-items-center justify-content-between my-2 px-1 mx-2 rounded-3">
                خروج
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
