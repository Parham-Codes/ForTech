import { useEffect, useRef, useState } from "react";
import "./productPageBuyBtn.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ProductPageBuyBtn({ data }) {
  const [isBuyBtnClicked, setIsBuyBtnClicked] = useState(false);
  const [orderCount, setOrderCount] = useState(1);
  const [stockCount, setStockCount] = useState(0);
  const { addToCart, cart, removeFromCart, decreaseFromCart } = useCart();
  const pageLocation = useLocation();
  const productId = useParams().id

  useEffect(() => {
    setStockCount(data?.count_stock);
  }, [data]);

  useEffect(() => {
    if (cart.length===0) {
      setOrderCount(0)
    }
  } , [cart])

  const buyBtnhandler = () => {
    addToCart({
      id: data.id,
      title: data.card_description,
      price: data.price,
      image: data.thumbnail,
      pageUrl: pageLocation.pathname,
      count: 1,
    });
    setIsBuyBtnClicked(true);
    setOrderCount(1);
  };

  useEffect(() => {
    if (orderCount === 0) {
      setIsBuyBtnClicked(false);
    }
  }, [orderCount]);

  const increaseOrderCountHeandler = () => {
    if (orderCount < stockCount) {
      setOrderCount((prev) => prev + 1);
      addToCart({
        id: data.id,
        title: data.card_description,
        price: data.price,
        image: data.thumbnail,
        pageUrl: pageLocation,
        count: 1,
      });
    }
  };

  const dicreaseOrderCountHandler = () => {
    if (orderCount > 1) {
      setOrderCount((prev) => prev - 1);
      decreaseFromCart(data.id);
    } else {
      setOrderCount(0);
      removeFromCart(data.id);
    }
  };

  useEffect(() => {
  setIsBuyBtnClicked(false);
  setOrderCount(1);

  const cartItem = cart.find(item => item.id == data?.id);
  if (cartItem) {
    setIsBuyBtnClicked(true);
    setOrderCount(cartItem.count);
  }
}, [productId, data, cart]);

  

  return (
    <>
      {data?.in_stock ? (
        isBuyBtnClicked ? (
          <div className="mb-2 py-3 d-flex justify-content-center align-items-center">
            <button
              disabled={orderCount === 0}
              onClick={dicreaseOrderCountHandler}
              className={`bg-white border-0 w-auto p-0 mx-5 text-primary ${orderCount === 0 && "text-black-50"} `}
            >
              <FaMinus className=" fs-3" />
            </button>
            <p className="my-0 text-center fs-4">{orderCount}</p>
            <button
              disabled={orderCount === stockCount}
              onClick={increaseOrderCountHeandler}
              className={`bg-white border-0 w-auto p-0 mx-5 text-primary ${orderCount === stockCount && "text-black-50"}`}
            >
              <FaPlus className=" fs-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={buyBtnhandler}
            className="btn btn-primary w-100 py-3 mb-4"
          >
            افزودن به سبد خرید
          </button>
        )
      ) : (
        <p className="text-danger w-100 text-center pt-4">
          متاسفانه این محصول در حال حاضر موجود نمیباشد
        </p>
      )}
    </>
  );
}

export default ProductPageBuyBtn;
