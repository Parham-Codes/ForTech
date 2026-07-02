import { useEffect, useState } from "react";
import "./userOrderInfoPage.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import { Col, Row } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";

function UserOrderInfoPage() {
  const orderId = useParams().userPanelOrderId;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/orders/${orderId}`);

        if (res.data.userId !== user.id) {
          toast.error("شما به این سفارش دسترسی ندارید!");
          navigate("/user/orders");
          return;
        }

        setData(res.data);

        const totalCount = res.data.items?.reduce(
          (sum, item) => sum + item.count,
          0,
        );

        setOrderCount(totalCount || 0);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت اطلاعات پیش آمده");
      }
    };

    fetchData();
  }, [orderId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <div className="pt-4">
      <h3 className="ms-3">جزئیات سفارش : </h3>
      <div className="px-3 mt-4">
        <div className="border d-flex justify-content-between align-items-center rounded rounded-2 px-4 py-3">
          <div>
            <p className="m-0">شناسه سفارش : {data.id}</p>
            <p className="m-0 mt-2">وضعیت سفارش : {data.status}</p>
            <p className="m-0 mt-2">تاریخ : {formatDate(data.date)}</p>
          </div>
          <button
            onClick={() => navigate("/user/orders")}
            className="btn btn-outline-danger"
          >
            بازگشت
          </button>
        </div>

        <Row className="w-100 mx-auto mt-3">
          <Col xs={12} lg={8}>
            <div className="border rounded rounded-2 py-3 px-3">
              {data.items?.map((item) => (
                <div className="border-bottom border-top d-flex justify-content-center align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <img style={{height: '80px' , backgroundColor: 'white'}} src={item.image} alt={item.title} />
                    <p className="m-0">{item.title}</p>
                  </div>
                  <div>
                    <p className="d-flex m-0 me-3">{item.count}x</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div className="border rounded rounded-2 py-3 px-3 mt-3 mt-lg-0">
              <h5>جزئیات</h5>
              <p>
                {" "}
                مبلغ کل : {Number(data.totalPrice).toLocaleString("fa-IR")}
              </p>
              <p> تعداد ایتم های سفارش : {data.items?.length}</p>
              <p>تعداد کل اقلام سفارش : {orderCount}</p>
            </div>
            <div className="border rounded rounded-2 mt-3 py-3 px-3 mb-5">
              <h5>جزئیات حمل و نقل</h5>
              <p>آدرس تحویل گیرنده : {data.customer?.address}</p>
              <p>کد پستی : {data.customer?.postalCode}</p>
              <p> شماره ثابت : {data.customer?.houseNum}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserOrderInfoPage;
