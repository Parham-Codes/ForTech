import "./App.css";
import AppRoute from "./routes/routes";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <HelmetProvider>

            <Toaster position="top-center" reverseOrder={false} />

            <AppRoute />

          </HelmetProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
