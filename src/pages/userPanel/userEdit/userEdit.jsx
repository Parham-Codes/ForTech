import { Col, Row } from "react-bootstrap";
import "./userEdit.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import { useAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";

function UserEdit() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reload , setReload] = useState(false)
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/users/${user.id}`);

        const data = res.data;

        setName(data.name);
        setLastName(data.lastName);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت اطلاعات کاربر پیش آمده");
      }
    };

    fetchInfo();
  }, [reload]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "ویرایش کاربر",
      text: "آیا از ویرایش اطلاعات خود مطمئن هستید ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!result.isConfirmed) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true)

    const updateData = {};
    if (name.length > 0) updateData.name = name;
    if (lastName.length > 0) updateData.lastName = lastName;
    if (email.length > 0) updateData.email = email;
    if (password.length > 0) updateData.password = password;

    try{

      const res = await axios.patch(`${DbHttpAddress}/users/${user.id}` , updateData)

      toast.success('اطلاعات با موفقیت ذخیره شد')

    }catch(error){
      console.log(error);
      toast.error('مشکلی در ارسال اطلاعات پیش آمده')
    }
    finally{
      setReload(!reload)
      setIsLoading(false)
    }
    

  };

  return (
    <div className="userEditContainer">
      <div className="mt-5">
        <h3 className="ms-4 mb-4">ویرایش اطلاعات </h3>

        <div>
          <form onSubmit={submitHandler} className="px-3">
            <Row className="w-100 gy-3 mx-auto">
              <Col xs={12} md={6} className="">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="name">نام</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="w-100 mt-1"
                    type="text"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} className="">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="lastname">نام خانوادگی</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastname"
                    className="w-100 mt-1"
                    type="text"
                  />
                </div>
              </Col>
            </Row>
            <Row className="w-100 mt-2 gy-3 mx-auto">
              <Col xs={12} md={6} className="">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="email">ایمیل</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="w-100 mt-1"
                    type="email"
                  />
                </div>
              </Col>
              <Col xs={12} md={6} className="">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="password">کلمه عبور</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="ltr"
                    id="password"
                    className="w-100 mt-1"
                    type="text"
                    minLength={8}
                  />
                </div>
              </Col>
            </Row>

            <button disabled={isLoading} type="submit" className="btn btn-primary mt-4 ms-3 px-4">
             {isLoading ? 'در حال ذخیره تغییرات' : 'ذخیره'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
