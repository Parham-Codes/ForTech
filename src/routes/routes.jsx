import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../Pages/Home/home"));
const Shop = lazy(() => import("../pages/shop/shop"));
const NotFound = lazy(() => import("../pages/not-found/notFound"));
const CuntactUs = lazy(() => import("../pages/contact-us/contactUs"));
const Login = lazy(() => import("../pages/login/login"));
const Register = lazy(() => import("../pages/register/register"));
const Cart = lazy(() => import("../pages/cart/cart"));
const AboutUs = lazy(() => import("../pages/about-Us/aboutUs"));
const ProductPage = lazy(() => import("../pages/productPage/productPage"));
const Checkout = lazy(() => import("../pages/checkout/checkout"));
const AdminDashboard = lazy(() => import("../pages/adminPanel/adminDashboard/adminDashboard"),);
const AdminProducts = lazy(() => import("../pages/adminPanel/adminProducts/adminProducts"),);
const AdminUsers = lazy(() => import("../pages/adminPanel/adminUsers/adminUsers"),);
const AdminOrders = lazy(() => import("../pages/adminPanel/adminOrders/adminOrders"),);
const AdminUsersEditPage = lazy(() => import("../pages/adminPanel/adminUsersEditPage/adminUsersEditPage"));
const AdminProductsEditPage = lazy(() => import( "../pages/adminPanel/adminProductsEditPage/adminProductsEditPage"));
const AdminOrderInfo = lazy(() => import("../pages/adminPanel/adminOrderInfo/adminOrderInfo"));
const UserOrders = lazy(() => import("../pages/userPanel/userOrders/userOrders"))
const UserEdit = lazy(() => import("../pages/userPanel/userEdit/userEdit"))
import PageLoading from "../components/pageLoading/pageLoading";
import ProtectedRoute from "./protectedRoutes";
import CheckoutRoute from "./checkoutRoutes";
import MainLayout from "./mainLayout";
import AdminLayout from "./adminLayout";
import AdminProtectedRoute from "./adminProtectedRoute";
import UserLayout from "./userLayout";
import UserDashBoard from "../pages/userPanel/userDashBoard/userDashBoard";
import UserProtectedRoute from "./userProtectedRoute";
import UserOrderInfoPage from "../pages/userPanel/userOrderInfoPage/userOrderInfoPage";

function AppRoute() {
  return (
    <Suspense
      fallback={
        <div
          className=" position-fixed w-100 d-flex align-items-center justify-content-center top-0"
          style={{ height: "100%" , backgroundColor: '#535353' }}
        >
          <PageLoading />
        </div>
      }
    >
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Shop />}>
            <Route path="laptops" element={<Shop />} />
            <Route path="phones" element={<Shop />} />
          </Route>
          <Route path="/products/laptops/:id" element={<ProductPage />} />
          <Route path="/products/phones/:id" element={<ProductPage />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<CuntactUs />} />

          <Route path="/cart" element={<Cart />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<CheckoutRoute />}>
              <Route path="/cart/checkout" element={<Checkout />} />
            </Route>
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Route>

        <Route element={<UserProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/user/orders" element={<UserOrders />} />
            <Route path="/user/orders/:userPanelOrderId" element={<UserOrderInfoPage />} />
            <Route path="/user/edit" element={<UserEdit />} />
          </Route>
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/edit/:adminProductID" element={<AdminProductsEditPage />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/edit/:userInfoId" element={<AdminUsersEditPage />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:orderInfoId" element={<AdminOrderInfo />} />
          </Route>
        </Route>

      </Routes>

    </Suspense>
  );
}

export default AppRoute;
