import { useNavigate, useParams } from "react-router-dom";
import "./adminUsersEditPage.css";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import Swal from "sweetalert2";

function AdminUsersEditPage() {
  const userId = useParams().userInfoId;

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/users/${userId}`);
        const userData = res.data;

        setName(userData.name);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword(userData.password);
        setUserRole(userData.role);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دیافت اطلاعات کاربر پیش آمده");
      }
    };

    fetchUserData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await Swal.fire({
      title: "ویرایش کاربر",
      text: "آیا از ویرایش اطلاعات این کاربر مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!result.isConfirmed) {
      setIsLoading(false);
      return;
    }

    const updateData = {};
    if (name.length > 0) updateData.name = name;
    if (lastName.length > 0) updateData.lastName = lastName;
    if (email.length > 0) updateData.email = email;
    if (password.length > 0) updateData.password = password;
    if (userRole.length > 0) updateData.role = userRole;

    try {
      await axios
        .patch(`${DbHttpAddress}/users/${userId}`, updateData)
        .then(toast.success("کاربر مورد نظر ویرایش شد"));

    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده");
    } finally {
      setIsLoading(false);
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-100 px-5">
      <div className="d-flex align-items-center justify-content-between mt-5 mb-1">
        <h2 className="panelTIcolor ms-2">ویرایش کاربر</h2>
        <button
          onClick={() => navigate("/admin/users")}
          className="btn btn-danger "
        >
          بازگشت{" "}
        </button>
      </div>

      <div className="adminEditForm rounded-3 w-100 ms-1">
        <form
          className="w-100 paneltTXcolor"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="d-flex w-100 pt-4 pb-4 px-2 d-flex flex-column">
            <Row className="w-100 mx-auto gy-3" xs={1} md={2}>
              <Col>
                <label className="ps-2 pb-1" htmlFor="userNameEdit">
                  نام
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="userNameEdit"
                />
              </Col>
              <Col>
                <label className="ps-2 pb-1" htmlFor="userLastNameEdit">
                  نام خانوادگی
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="userLastNameEdit"
                />
              </Col>
            </Row>
            <Row className="w-100 mx-auto gy-3 mt-1 mt-md-4" xs={1} md={2}>
              <Col>
                <label className="ps-2 pb-1" htmlFor="userEmailEdit">
                  ایمیل
                </label>
                <input
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="userEmailEdit"
                />
              </Col>
              <Col>
                <label className="ps-2 pb-1" htmlFor="userPasswordEdit">
                  رمز
                </label>
                <input
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  id="userPasswordEdit"
                  minLength={8}
                />
              </Col>
            </Row>
            <div className="pt-4 px-5">
              <label htmlFor="inStock">نقش کاربر</label>
              <select
                id="inStock"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className=" paneltTXcolor rounded"
                style={{
                  backgroundColor: "#161618",
                  border: "1px solid #525257",
                  width: "100%",
                  padding: "5px 8px",
                }}
              >
                <option value="admin">ادمین</option>
                <option value="user">کاربر عادی</option>
              </select>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary mt-5 mx-5"
            >
              {isLoading ? "درحال ویرایش ..." : "ویرایش"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUsersEditPage;
