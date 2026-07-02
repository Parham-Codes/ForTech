import { useEffect, useState } from "react";
import "./adminUsers.css";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Pagination from "../../../components/pagination/paginationComponent";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("user");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/users`);

        if (res.data.length === 0) {
          toast.error("کاربری یافت نشد");
          return;
        }

        setUsers(res.data);
      } catch (error) {
        toast.error("مشکلی پیش آمده");
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const editUserHandler = (id) => {
    navigate(`edit/${id}`);
  };

  const deleteUserHandler = async (id) => {
    const result = await Swal.fire({
      title: "حذف کاربر",
      text: "آیا از حذف این کاربر مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${DbHttpAddress}/users/${id}`);

      toast.success("کاربر حذف شد");

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("مشکلی پیش آمد");

      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const addUser = { name, lastName, email, password };
    if (name.length > 0) addUser.name = name;
    if (lastName.length > 0) addUser.lastName = lastName;
    if (email.length > 0) addUser.email = email;
    if (password.length > 0) addUser.password = password;
    if (userRole.length > 0) addUser.role = userRole;

    if (!name || !lastName || !email || !password) {
      toast.error("تمام فیلدها باید پر باشند");
      setIsLoading(false);
      return;
    }

    try {
      const isEmailExist = await axios.get(
        `${DbHttpAddress}/users?email=${email}`,
      );
      if (isEmailExist.data.length > 0) {
        toast.error("این ایمیل قبلا ثبت شده است");
        return;
      }

      const res = await axios.post(`${DbHttpAddress}/users`, addUser);

      toast.success("کاربر اضافه شد");
      setUsers((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده");
    } finally {
      setIsLoading(false);
      setIsAddUserFormOpen(false);
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = users.slice(start, end);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount || 1);
    }
  }, [pageCount]);

  return (
    <>
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between mt-5">
          <h2 className="panelTIcolor ms-5">لیست کاربران</h2>
          <button
            onClick={() => setIsAddUserFormOpen(true)}
            className="btn paneltTXcolor me-5"
          >
            اضافه کردن کاربر جدید
          </button>
        </div>
        <div className="adminPanelUsersDiv w-100">
          <div className=" w-100 px-5">
            <table className=" usersListTable rounded overflow-hidden rounded-3 w-100 mt-4 mx-auto">
              <thead className="">
                <tr>
                  <th className="paneltTXcolor text-center">آیدی کاربر</th>
                  <th className="paneltTXcolor text-center">نام</th>
                  <th className="paneltTXcolor text-center">نام خانوادگی</th>
                  <th className="paneltTXcolor text-center">نقش</th>
                  <th className="paneltTXcolor text-center">ایمیل</th>
                  <th className="paneltTXcolor text-center">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((item) => {
                    return (
                      <tr key={item.id} className="border-top border-bottom">
                        <td className="paneltTXcolor text-center">{item.id}</td>
                        <td className="paneltTXcolor text-center">
                          {item.name}
                        </td>
                        <td className="paneltTXcolor text-center">
                          {item.lastName}
                        </td>
                        <td className="paneltTXcolor text-center">
                          {item.role}
                        </td>
                        <td className="paneltTXcolor text-center">
                          {item.email}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => editUserHandler(item.id)}
                            className="btn paneltTXcolor text-center"
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            onClick={() => deleteUserHandler(item.id)}
                            className="btn paneltTXcolor text-center"
                          >
                            <BiTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="paneltTXcolor text-center fs-4">
                      کاربری یافت نشد !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <Pagination
            pageCount={pageCount}
            forcePage={page}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </div>
      </div>

      <div className={`addUserOverlay ${isAddUserFormOpen ? "active" : ""}`}>
        <div className="addUserModal">
          <div className="w-100 px-5">
            <h2 className="panelTIcolor mt-5 ">افزودن کاربر</h2>

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
                  <Row
                    className="w-100 mx-auto gy-3 mt-1 mt-md-4"
                    xs={1}
                    md={2}
                  >
                    <Col>
                      <label className="ps-2 pb-1" htmlFor="userEmailEdit">
                        ایمیل
                      </label>
                      <input
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

                  <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-primary me-4 mt-0 px-4"
                    >
                      {isLoading ? "درحال پردازش ..." : "اضافه کردن"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddUserFormOpen(false);
                        setEmail("");
                        setName("");
                        setLastName("");
                        setPassword("");
                      }}
                      className="btn btn-danger mb-0 px-4"
                    >
                      بازگشت
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
