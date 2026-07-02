import { Col } from "react-bootstrap";
import './productPageResBuyBtn.css'
import ProductPageBuyBtn from "../productPageButBtn/productPageBuyBtn";


function ProductPageResBuyBtn({data , formattedPrice}) {
  return (
    <Col
      lg={4}
      className="ResBtnDiv d-none d-lg-block rounded-4 shadow-sm h-25 pt-lg-3 pb-4 sticky-top bg-white m-0"
      style={{ top: "30px" }}
    >
      <div className="PpageResBtnHeader d-flex justify-content-center align-items-center">
        <img className="w-25" src={data.thumbnail} alt={data.model} />
        <h4 className="w-75 fs-6">{data.card_description}</h4>
      </div>
      <div className="PpageResBtnDescription px-3 mt-3">
        <p className="fw-bold">
          مدل : <span className="text-black-50">{data?.model}</span>
        </p>
        <p className="fw-bold">
          گارانتی : <span className="text-black-50"> 18 ماهه شرکتی</span>
        </p>
        <p className="fw-bold">
          فروشنده : <span className="text-black-50">ForTech</span>
        </p>
      </div>
      <div className="PpageResBtnFooter ">
        <p className="fw-bold fs-3 text-end pe-lg-2 d-flex justify-content-end align-items-center">
          {formattedPrice}
          <span className="ms-1 ms-lg-3 text-black-50">تومان</span>
        </p>
        <ProductPageBuyBtn data={data} />
      </div>
    </Col>
  );
}

export default ProductPageResBuyBtn;
