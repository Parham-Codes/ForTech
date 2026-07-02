import { Link } from "react-router-dom";
import "./productCard.css";
import * as ReactSVG from "react-svg";
import { useEffect, useState } from "react";

function ProductCard({ productData }) {
  let price = productData.price;

  let formattedPrice = Number(price).toLocaleString("fa-IR");

  const [linkRoute , setLinkRoute] = useState('')

  useEffect(() =>{
    
    if (productData.id.includes('P')) {
      setLinkRoute('/phones')
    }
    if (productData.id.includes('lap')) {
      setLinkRoute('/laptops')
    }
    
  } , [productData])



  return (
    <>
      <div className="PDiv">
        <div className="PCard bg-white">
          <div className="top px-5 py-4 d-flex justify-content-center align-items-center">
            <Link to={`/products/${linkRoute}/${productData.id}`}>
              <img className="img-fluid" src={productData.thumbnail} />
            </Link>
          </div>
          <div className="divider-line text-black mb-2 mx-auto rounded rounded-pill"></div>
          <div className="bottom d-flex flex-column cursorDefault">
            <div className="Pdisc ">
              <p className="Ppar lalezar">{productData.card_description}</p>
              <div className="PrPrice fs-5 priceField d-flex justify-content-end align-items-center ">
                {formattedPrice}
                <span className="fs-6 secColor">
                  <ReactSVG.ReactSVG
                    src="/tomanSvg/toman.svg"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "2px",
                      color: "#007bff",
                    }}
                  ></ReactSVG.ReactSVG>
                </span>
              </div>
            </div>
            <Link
              className="m-3 text-decoration-none text-black"
              to={`/products/${linkRoute}/${productData.id}`}
            >
              <button className="w-100 secBgColor fw-bold lalezar text-black-50">بررسی محصول</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
