import "./header.css";
import { FaCreditCard, FaSearch } from "react-icons/fa";
import { IoBulbOutline, IoCallSharp, IoMapOutline } from "react-icons/io5";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../components/cartIcon/cartIcon";
import CategoryDropdown from "../components/headerCategory/categoryDropdown";
import Search from "../../search/search";
import { GoHomeFill } from "react-icons/go";
import { useAuth } from "../../../context/AuthContext";

function XlHeader() {
  const { user , logout } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="headerContainer pb-3 d-none d-lg-block">
      <div className="myheader">
        <div className="top bg-white d-flex justify-content-between">
          <div className="right d-flex">
            <Link to="/" className="text-decoration-none secColor">
              <h1 className="lalezar mx-4 fst-italic secColor">فورتک</h1>
            </Link>
            <Search />
          </div>

          <div className="left d-flex align-items-center">
            {user != null ? (
              <>
                {user.role === 'admin' ? <button onClick={() => navigate('/admin/dashboard')} className="btn btn-outline-primary px-3 py-1 me-3">پنل مدیریت</button> : '' }
                <button onClick={() => navigate('/user/orders')} className="btn btn-primary me-3 py-1 px-3">حساب کاربری</button>
                <button onClick={() => logout()} className="btn btn-outline-danger px-3 py-1">خروج</button>
                <p className="mb-0 mx-3 pBgGray px-3 py-2 rounded-1">{user.name} عزیز خوش آمدید </p>
              </>
            ) : (
              <Link to="/login">
                <button className="px-3 rounded-1 mx-4 logInBtn">
                  ورود | ثبت نام
                </button>
              </Link>
            )}
            <div className="text-decoration-none">
              <CartIcon />
            </div>
          </div>
        </div>

        <div className="bottom bg-white d-flex justify-content-between align-items-center">
          <div className="d-flex list-unstyled ms-3 align-items-center">
            <div>
              <CategoryDropdown />
            </div>
            <NavLink to="/" className="text-decoration-none text-black">
              <GoHomeFill size={"18px"} className="me-2 secColor" />
              صفحه اصلی
            </NavLink>
            <NavLink to="/products" className="text-decoration-none text-black">
              <FaCreditCard size={"18px"} className="me-2 secColor" />
              فروشگاه
            </NavLink>
            <NavLink to="/about-us" className="text-decoration-none text-black">
              <IoBulbOutline size={"18px"} className="me-2 secColor" />
              درباره ما
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-decoration-none text-black"
            >
              <IoMapOutline size={"18px"} className="me-2 secColor" />
              ارتباط با ما
            </NavLink>
          </div>
          <div className="mx-3">
            <a href="tel:0212626" className="text-black text-decoration-none">
              <span className="fw-bold">021-2626</span>
              <IoCallSharp className="secColor fs-4 ms-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XlHeader;
