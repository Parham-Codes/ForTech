import { useState } from "react";
import "./register.css";
import toast from "react-hot-toast";
import axios from "axios";
import DbHttpAddress from "../../dbHttpAddress";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      

      if (password !== reEnterPassword) {
        toast.error("رمز عبور و تکرار آن یکسان نیست");
        return;
      }

      if (password.length < 8) {
        toast.error("رمز عبور باید حداقل 8 کاراکتر باشد");
        return;
      }

      setLoading(true);

      const res = await axios.get(`${DbHttpAddress}/users?email=${email}`);

      if (res.data.length > 0) {
        toast.error("ایمیل قبلا ثبت شده");
        return;
      }


      const newUser = {
        name,
        lastName,
        email,
        password,
        role : "user"
      };

      const reg = await axios.post(`${DbHttpAddress}/users`, newUser);

      toast.success("ثبت نام با موفقیت انجام شد");

      register(reg.data);

      navigate("/");
    } catch (error) {
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="Mycontainer d-flex justify-content-center align-items-center align-items-lg-baseline mt-lg-3"
      style={{ height: "650px" }}
    >
      
      <form onSubmit={submitHandler} className="w-100 px-3 px-lg-0">
        <h1 className="text-center fw-light">ثبت نام</h1>
        <div className="registryContainer d-flex flex-column mx-auto rounded-3 px-5 pb-3 pt-4 overflow-hidden">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center my-2">
            <label htmlFor="registerNameInput" className="mb-1 fs-5">
              نام :
            </label>
            <input
              dir="rtl"
              className="p-2 rounded-2 border-0 mb-3 mb-lg-0"
              id="registerNameInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="registerLastNameInput" className="mb-1 fs-5">
              نام خانوادگی :
            </label>
            <input
              dir="rtl"
              className="p-2 rounded-2 border-0"
              id="registerLastNameInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="d-flex my-2 flex-column align-items-center">
            <label
              htmlFor="registerEmailInput"
              className="mb-1 fs-5 me-2 text-start w-100"
            >
              ایمیل :
            </label>
            <input
              dir="ltr"
              className="myRegisterINput p-2 rounded-2 border-0 w-100"
              id="registerEmailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex my-2 flex-column align-items-center">
            <label
              htmlFor="registerPasswordInput"
              className="mb-1 fs-5 me-2 text-start w-100"
            >
              رمز عبور :
            </label>
            <input
              dir="ltr"
              className="myRegisterINput p-2 rounded-2 border-0 w-100"
              id="registerPasswordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              min={8}
            />
          </div>

          <div className="d-flex my-2 flex-column align-items-center">
            <label
              htmlFor="registerRePasswordInput"
              className="mb-1 fs-5 me-2 text-start w-100"
            >
              تکرار رمز عبور :
            </label>
            <input
              dir="ltr"
              className="myRegisterINput p-2 rounded-2 border-0 w-100"
              id="registerRePasswordInput"
              type="password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              required
              min={8}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary py-2 mt-4 w-75 mx-auto mb-3"
            disabled={loading}
          >
            {loading ? "در حال پردازش ..." : "ثبت نام"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
