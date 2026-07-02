import { useNavigate, useParams } from "react-router-dom";
import "./adminOrderInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";

function AdminOrderInfo() {
  const orderID = useParams().orderInfoId;

  const [orderInfo, setOrderInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchOrderAndUser = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/orders/${orderID}`);

        if (res.data === null) {
          toast.error("سفارشی با این آیدی یافت نشد");
          return;
        }

        const user = await axios.get(
          `${DbHttpAddress}/users/${res.data.userId}`,
        );

        if (user.data === null) {
          toast.error("کاربری با این آدی یافت نشد");
          return;
        }

        setUserInfo(user.data);

        setOrderInfo(res.data);
        setOrderStatus(res.data.status);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت اطلاعات پیش آمده");
      }
    };

    fetchOrderAndUser();
  }, [orderID]);

  const deleteOrderHandler = async (id) => {
    const result = await Swal.fire({
      title: "حذف سفارش",
      text: "آیا از حذف سفارش مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${DbHttpAddress}/orders/${id}`);

      navigate("/admin/orders");

      toast.success("سفارش حذف شد");
    } catch (error) {
      toast.error("مشکلی پیش آمد");
      console.log(error);
    }
  };

  const updateOrderHandler = async (id) => {
    const status = {
      status: orderStatus,
    };

    try {
      await axios.patch(`${DbHttpAddress}/orders/${id}`, status);

      toast.success("سفارش اپدیت شد");
    } catch (error) {
      toast.error("مشکلی پیش آمد");
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <>
      {orderInfo ? (
        <>
          <div className="adminOrderInfo pt-4">
            <div className="d-flex justify-content-between align-items-center px-4 mt-2 mb-4">
              <h3 className="panelTIcolor mx-3 mb-0">جزئیات سفارش</h3>
              <button
                onClick={() => navigate("/admin/orders")}
                className="btn btn-danger"
              >
                بازگشت
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center px-4 adminPanelBg rounded-2 mx-4 py-3">
              <div className="paneltTXcolor d-flex flex-column justify-content-center ">
                <h4 className="m-0">شناسه سفارش : {orderInfo?.id}</h4>
                <div className="my-1">
                  <label className="m-0">وضعیت سفارش : </label>
                  <select
                    className="ms-3 paneltTXcolor rounded"
                    style={{
                      backgroundColor: "#1f1f22",
                      border: "1px solid #525257",
                      padding: "5px 8px",
                    }}
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="در انتظار تایید ">در انتظار تایید</option>
                    <option value="تایید شده">تایید شده</option>
                    <option value="در حال پردازش">در حال پردازش</option>
                    <option value="در دست ارسال">در دست ارسال</option>
                  </select>

                  <button
                    onClick={() => updateOrderHandler(orderID)}
                    className="btn btn-primary py-2 ms-4"
                  >
                    اپدیت وضعیت سفارش
                  </button>
                </div>
                <p className="paneltTXcolor mb-0">
                  تاریخ : {formatDate(orderInfo?.date)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => deleteOrderHandler(orderID)}
                  className="btn btn-outline-danger"
                >
                  حذف سفارش
                </button>
              </div>
            </div>
          </div>

          <Row className="w-100 mb-5">
            <Col xs={12} lg={8}>
              <div className="ps-4">
                <table className="newOrderTable rounded overflow-hidden rounded-3 w-100 mt-4">
                  <thead className="">
                    <tr>
                      <th className="paneltTXcolor text-center">تصویر</th>
                      <th className="paneltTXcolor text-center">نام محصول</th>
                      <th className="paneltTXcolor text-center">مبلغ</th>
                      <th className="paneltTXcolor text-center">تعداد</th>
                      <th className="paneltTXcolor text-center">مجموع</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderInfo.items ? (
                      orderInfo.items.map((item) => {
                        return (
                          <tr
                            key={item?.id}
                            className="border-top border-bottom"
                          >
                            <td className="paneltTXcolor text-center">
                              <img
                                style={{
                                  height: "80px",
                                  width: "auto",
                                  backgroundColor: "white",
                                  borderRadius: "8px",
                                }}
                                src={item?.image}
                                alt={item?.title}
                              />
                            </td>
                            <td className="paneltTXcolor text-center">
                              {item?.title}
                            </td>
                            <td className="paneltTXcolor text-center">
                              {Number(item?.price).toLocaleString("fa-IR")}
                            </td>
                            <td className="paneltTXcolor text-center">
                              {item?.count}
                            </td>
                            <td className="paneltTXcolor text-center">
                              {Number(item?.count * item?.price).toLocaleString(
                                "fa-IR",
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="paneltTXcolor text-center fs-4"
                        >
                          سفارش جدیدی ندارید!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col xs={1} lg={4}>
              <div className=" paneltTXcolor">
                <div className="adminPanelBg mt-4 rounded rounded-3 pt-2 px-4 pb-5">
                  <h5 className="mt-4">جزئیات مشتری</h5>

                  <div className="d-flex justify-content-start align-items-center mt-3">
                    <div className="border rounded-circle p-1 mx-3">
                      <BsPerson className="" size="25px" />
                    </div>
                    <p className="m-0 ms-1">
                      {userInfo?.name} {userInfo?.lastName}
                    </p>
                  </div>
                  <p className="m-0 ms-3 mt-5">
                    نام تحویل گیرنده : {orderInfo.customer?.fullName}
                  </p>
                  <p className="m-0 ms-3 mt-2">
                    شماره تلفن همراه گیزنده : {orderInfo.customer?.phoneNum}
                  </p>
                  <p className="m-0 ms-3 mt-2">
                    شماره تلفن ثابت گیرنده : {orderInfo.customer?.houseNum}
                  </p>
                </div>
                <div className="adminPanelBg mt-4 rounded rounded-3 pt-2 px-4 pb-5">
                  <h5 className="mt-4">جزئیات حمل و نقل</h5>

                  <p className="m-0 ms-3 mt-3">
                    {" "}
                    آدرس : {orderInfo.customer?.address}
                  </p>
                  <p className="m-0 ms-3 mt-2">
                    {" "}
                    کد پستی : {orderInfo.customer?.postalCode}
                  </p>
                </div>
                <div className="adminPanelBg mt-4 rounded rounded-3 pt-2 px-4 pb-5 mb-5">
                  <h5 className="mt-4"> جزئیات پرداخت </h5>

                  <p className="m-0 ms-3 mt-3">
                    {" "}
                    مبلغ کل :{" "}
                    {Number(orderInfo?.totalPrice).toLocaleString("fa-IR")}{" "}
                    تومان
                  </p>
                  <p className="m-0 ms-3 mt-2"> مقدار تخفیف : 0 تومان</p>
                  <p className="m-0 ms-3 mt-2">وضعیت پرداخت : (بدون درگاه)</p>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <div className="w-100 h-75 d-flex justify-content-center align-items-center">
          <h2 className="paneltTXcolor">
            مشکلی در دریافت اطلاعات به وجود در آمده !
          </h2>
        </div>
      )}
    </>
  );
}

export default AdminOrderInfo;
