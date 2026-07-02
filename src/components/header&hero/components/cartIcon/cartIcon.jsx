import { Link } from "react-router-dom";
import "./carticon.css";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../../../../context/CartContext";
import { Col, Row } from "react-bootstrap";


function CartIcon() {
  
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <div className="cartIcon me-lg-4 rounded-1">
        <Link to="/cart">
          <IoCartOutline />

          <span className="position-absolute lalezar ">
            {cart.length > 0 ? cart.length : 0}
          </span>
        </Link>

        <div className="cartIconDropDown" style={cart.length===0 ? {height: "auto"} : {height : '400px'}}>
          <Row lg={1} className="w-100">
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <Col key={item.id} className="">
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
                  </Col>
                );
              })
            ) : (
              <p className="p-5 text-center">سبد خرید شما خالی است</p>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default CartIcon;
