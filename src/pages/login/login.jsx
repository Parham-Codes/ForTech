import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import DbHttpAddress from "../../dbHttpAddress";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.get(`${DbHttpAddress}/users?email=${email}`);

      if (res.data.length === 0) {
        toast.error("حساب کاربری با ایمیل مورد نظر یافت نشد");

        return;
      }

      if (password != res.data[0].password) {
        toast.error("ایمیل یا رمز عبور اشتباه است");

        return;
      }

      login(res.data[0]);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده");
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="Mycontainer d-flex justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <form onSubmit={submitHandler} className="w-100 px-3 px-sm-5">
        <div className="loginContainer d-flex flex-column  mx-auto rounded-3 px-5 pb-3 pt-4">
          <label htmlFor="loginEmailInput" className="mb-1 fw-bold fs-5">
            ایمیل :
          </label>
          <input
            dir="ltr"
            className="p-2 rounded-2 border-0"
            id="loginEmailInput"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor="loginPasswordInput"
            className="mt-3 mb-1 fw-bold fs-5"
          >
            رمز عبور :{" "}
          </label>
          <input
            dir="ltr"
            className="p-2 rounded-2 border-0"
            id="loginPasswordInput"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary mt-4 w-100"
          >
            {loading ? "در حال ورود ..." : "ورود"}
          </button>

          <Link
            to="/register"
            className="mb-4 mt-2 mx-auto text-decoration-none"
          >
            ثبت نام نکرده اید ؟ کلیک کنید
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
