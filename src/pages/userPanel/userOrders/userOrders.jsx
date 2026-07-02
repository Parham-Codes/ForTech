import "./userOrders.css";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${DbHttpAddress}/orders?userId=${user.id}`,
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی پیش آمده");
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <div className="userOrdersContainer pt-4">
      <h3 className="ms-5">سفارش ها</h3>
      <div className="userOrderCardContainer">
        <Row xs={1} className="w-100 mx-auto">
          {orders.length > 0 ? orders.map((item) => (
            <Col className="px-2 px-md-5 pt-3">
              <div className="userOrderCard w-100 px-3 py-2 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex mt-3 flex-column flex-md-row">
                    <p className="m-0 my-2 my-md-0">تاریخ سفارش : {formatDate(item.date)}</p>
                    <span className="mx-3 d-none d-md-block">,</span>
                    <p className="m-0 my-2 my-md-0">کد سفارش : {item.id}</p>
                    <span className="mx-3 d-none d-md-block">,</span>
                    <p className="m-0 my-2 my-md-0">
                      مبلغ : {Number(item.totalPrice).toLocaleString("fa-IR")}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => navigate(`/user/orders/${item.id}`)} className="btn btn-outline-primary mt-3">مشاهده جزئیات</button>
                  </div>
                </div>
                <div className="mt-3 border-top">
                  <Row className="w-100 align-items-center mx-auto">
                    <p className="m-0 mt-2"> محصولات سفارش داده شده :</p>
                    {item.items.map((product) => (
                      <Col xs={3} sm={2} md={2} lg={1} className="" >
                        <div className="py-3">
                          <img className="border rounded rounded-2 w-100" src={product.image} alt={product.title} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          )) : <div className="w-100 d-flex justify-content-center align-items-center fs-5 mt-5 py-5">سفارشی از طرف شما ثبت نشده!</div>}
        </Row>
      </div>
    </div>
  );
}

export default UserOrders;
