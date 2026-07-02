import "./header.css";
import logo from "../../../assets/image/logo/logo.png";
import CartIcon from "../components/cartIcon/cartIcon";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../../search/search";
import { useEffect, useRef, useState } from "react";
import { IoBulbOutline, IoCloseSharp, IoMapOutline } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import CategoryDropdown from "../components/headerCategory/categoryDropdown";
import { GoHomeFill } from "react-icons/go";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

function SmHeader() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuRef = useRef();
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  let myLocation = useLocation().pathname;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [myLocation]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      // اگر منو وجود داشته باشه و کلیک بیرونش باشه
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="SmHeadercontainer bg-white d-lg-none">
      <div className="SmHeader d-flex justify-content-between align-items-center">
        <div className="right d-flex justify-content-center align-items-center">
          <Link to="/" className="text-decoration-none text-black">
            <img src={logo} className="SmheaderLogo d-block mx-auto text" />
          </Link>
          <Link to="/" className="text-decoration-none secColor">
            <h1 className="lalezar m-0 p-0">ForTech</h1>
          </Link>
        </div>
        <div className="left d-flex justify-content-center align-items-center">
          <CartIcon />
          <div
            onClick={() => setIsMenuOpen(true)}
            className="ms-2 py-2 pe-3 ps-2 fs-1"
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      <div className="SmHeaderSearchDiv">
        <Search />
      </div>

      <div
        ref={menuRef}
        className={`SmHeaderMenu ${isMenuOpen ? "ShowSmHeaderMenu" : ""} `}
      >
        <div className={` h-100 ${isMenuOpen ? "" : "d-none"}`}>
          <div className="closeMenuBTn" onClick={() => setIsMenuOpen(false)}>
            <IoCloseSharp size="30px" />
          </div>
          <div
            className="my-5 pt-3 h-75 d-flex flex-column list-unstyled ms-3 align-items-start"
            style={{ height: "200px" }}
          >
            {user != null ? (
              <>
                <p className="mb-3  pBgGray px-3 py-2 rounded-1">
                  {user.name} عزیز خوش آمدید{" "}
                </p>
                <button
                  onClick={() => navigate("/user/orders")}
                  className="btn btn-primary mb-2 py-1 px-3"
                >
                  حساب کاربری
                </button>
                <button
                  onClick={() => {
                    logout();
                    toast.success("از حساب خود خارج شدید");
                  }}
                  className="btn btn-outline-danger px-3 py-1 mb-3"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="px-3 rounded-1 logInBtn mb-3">
                  ورود | ثبت نام
                </button>
              </Link>
            )}

            <div>
              <CategoryDropdown />
            </div>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/"
              className="text-decoration-none text-black mt-3 fw-bold fs-6 "
            >
              <span className="mx-2"> خانه</span>
              <GoHomeFill size={"18px"} className=" secColor" />
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/products"
              className="text-decoration-none text-black mt-3 fw-bold fs-6"
            >
              <span className="mx-2"> فروشگاه</span>
              <FaCreditCard size={"18px"} className=" secColor" />
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/about-us"
              className="text-decoration-none text-black mt-3 fw-bold fs-6"
            >
              <span className="mx-2"> درباره ما</span>
              <IoBulbOutline size={"18px"} className="= secColor" />
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/contact-us"
              className="text-decoration-none text-black mt-3 fw-bold fs-6"
            >
              <span className="mx-2"> ارتباط با ما</span>
              <IoMapOutline size={"18px"} className=" secColor" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmHeader;
