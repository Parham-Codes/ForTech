import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./checkout.css";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import DbHttpAddress from "../../dbHttpAddress";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Checkout() {
  const { cart, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [houseNum, setHouseNum] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      return;
    }

    if (phoneNum.length !== 11) {
      alert("شماره موبایل باید 11 رقم باشد");
      return;
    }

    if (postalCode.length !== 10) {
      toast.error("کد پستی باید 10 رقم باشد")
      return;
    }

    setLoading(true);

    const orderData = {
      userId: user.id,
      items: cart,
      totalPrice: totalPrice,
      customer: {
        fullName,
        phoneNum,
        houseNum,
        postalCode,
        address,
      },
      status: "در انتظار تایید",
      date: new Date().toISOString(),
    };

    try {
      await axios.post(`${DbHttpAddress}/orders`, orderData);


      await Promise.all(
        cart.map( async (item) => {
          const res = await axios.get(`${DbHttpAddress}/products/${item.id}`)
          const productStock = res.data

          if (item.count > productStock.count_stock) {
            toast.error(`موجودی محصول ${productStock.title} کافی نیست!`)
            throw new Error("stock insufficient");
          }

          const newStock = productStock.count_stock - item.count
          
          await axios.patch(`${DbHttpAddress}/products/${item.id}` , {
            count_stock : newStock,
            in_stock : newStock > 0
          })

        })
      )


      clearCart();

      setFullName("");
      setPhoneNum("");
      setHouseNum("");
      setPostalCode("");
      setAddress("");

      toast.success("سفارش شما با موفقیت ثبت شد");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(" مشکلی پیش آمده");
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <div className="Mycontainer">
      <Row className="w-100 mx-auto">
        <Col xs={12} xl={8}>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="bg-white m-3 rounded-4">
              <div className="inputContainer">
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-4">
                  <label htmlFor="checkoutName">نام و نام خانوادگی تحویل گیرنده : </label>
                  <input
                    className="checkoutInputs py-1 px-2 rounded border-0 shadow-sm"
                    type="text"
                    required
                    id="checkoutName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-4">
                  <label htmlFor="checkoutPhoneNum">شماره تلفن همراه : </label>
                  <input
                    className="checkoutInputs py-1 px-2 rounded border-0 shadow-sm"
                    type="text"
                    required
                    maxLength={11}
                    minLength={11}
                    id="checkoutPhoneNum"
                    value={phoneNum}
                    onChange={(e) =>
                      setPhoneNum(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-4">
                  <label htmlFor="checkoutHouseNum">شماره تلفن ثابت : </label>
                  <input
                    className="checkoutInputs py-1 px-2 rounded border-0 shadow-sm"
                    type="text"
                    required
                    maxLength={11}
                    minLength={11}
                    id="checkoutHouseNum"
                    value={houseNum}
                    onChange={(e) =>
                      setHouseNum(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-4">
                  <label htmlFor="checkoutPostalCode">کد پستی : </label>
                  <input
                    className="checkoutInputs py-1 px-2 rounded border-0 shadow-sm"
                    type="text"
                    required
                    maxLength={10}
                    minLength={10}
                    id="checkoutPostalCode"
                    value={postalCode}
                    onChange={(e) =>
                      setPostalCode(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-4">
                  <label htmlFor="checkoutAddress">ادرس : </label>
                  <textarea
                    rows={3}
                    className="checkoutInputs py-1 px-2 rounded border-0 shadow-sm"
                    type="text"
                    required
                    id="checkoutAddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <button
                disabled={cart.length === 0 || loading}
                className="btn btn-primary my-3 mx-3"
                type="submit"
              >
                {loading ? "در حال پردازش ..." : "ثبت سفارش"}
              </button>
            </div>
          </form>
        </Col>

        <Col xs={12} xl={4}>
          <div
            className="cartInfoDiv bg-white m-3 rounded-4 overflow-hidden px-3 px-lg-5 py-lg-3 sticky-top"
            style={{ top: "20px", zIndex: "1" }}
          >
            <h4 className="mb-5 text-center mt-2">خلاصه سفارش</h4>

            <div className="d-flex align-items-center my-3 w-100 justify-content-between">
              <h5 className="fw-bold me-3">جمع کل:</h5>
              <p className="fs-6 text-dark-emphasis fw-bold m-0">
                {totalPrice.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <div className="d-flex align-items-center my-3 w-100 justify-content-between">
              <h5 className="fw-bold me-3"> هزینه ارسال:</h5>
              <p className="fs-6 text-dark-emphasis fw-bold m-0">
                وابسته به ادرس
              </p>
            </div>

            <div className="d-flex align-items-center my-3 w-100 justify-content-between">
              <h5 className="fw-bold me-3">تخفیف :</h5>
              <p className="fs-6 text-dark-emphasis fw-bold m-0">0 تومان</p>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
              <button
                onClick={() => {
                  clearCart();
                  navigate("/cart");
                }}
                disabled={cart.length === 0}
                className="btn btn-outline-danger mx-2"
              >
                خالی کردن سبد خرید
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Checkout;
