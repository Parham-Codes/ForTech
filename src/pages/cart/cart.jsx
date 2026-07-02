import "./cart.css";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate()

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  return (
    <div className="cartProducts">
      <Row className="w-100 mx-auto">
        <Col xs={12} lg={8}>
          {cart.length === 0 ? (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center w-100 my-5 p-lg-5">
                <p className="fw-bold fs-2">سبد خرید شما خالی میباشد !</p>
                <Link
                  to="/products"
                  className="text-decoration-none text-white"
                >
                  <button className="btn btn-primary fs-5">
                    بازدید از فروشگاه
                  </button>
                </Link>
              </div>
            </>
          ) : (
            cart.map((item) => {
              return (
                <div className="cartProductDiv bg-white m-0 my-2 m-lg-3 rounded-4 overflow-hidden">
                  <div className="d-flex align-items-center p-2 w-100">
                    <Link to={item.pageUrl}>
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt={item.title}
                      />
                    </Link>
                    <div className="w-75">
                      <div>
                        <h3 className="fs-6">{item.title}</h3>
                        <p className="fs-4">x {item.count}</p>

                        <div className="d-flex justify-content-between align-items-center">
                          {Number(item.price).toLocaleString("fa-IR")}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="btn btn-outline-danger ms-5"
                          >
                            حذف محصول از سبد خرید
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </Col>

        <Col xs={12} lg={4}>
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
              <p className="fs-6 text-dark-emphasis fw-bold m-0">وابسته به ادرس</p>
            </div>

            <div className="d-flex align-items-center my-3 w-100 justify-content-between">
              <h5 className="fw-bold me-3">تخفیف :</h5>
              <p className="fs-6 text-dark-emphasis fw-bold m-0">0 تومان</p>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
              <button
                onClick={() => clearCart()}
                disabled={cart.length === 0}
                className="btn btn-outline-danger mx-2"
              >
                خالی کردن سبد خرید
              </button>
              <button onClick={() => navigate('/cart/checkout')} disabled={cart.length === 0} className="btn btn-primary">
                ادامه ثبت سفارش
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
