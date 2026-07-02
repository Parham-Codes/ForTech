import { Navigate, Outlet } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CheckoutRoute() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return <Outlet />;
}

export default CheckoutRoute;
