import './productPageDecSection.css'
import { Col, Row } from "react-bootstrap";
import ProductInfo from "../productInfo/productInfo";
import ProductPageResBuyBtn from "../productPageResBuyBtn/productPageResBuyBtn";


function ProductPageDecSection({productType , data , formattedPrice}) {
  return (
    <Row className="w-100 my-4 mx-auto justify-content-between gy-3 ">
      <Col lg={8} className="px-0 pe-lg-3 py-0 m-0">
        <div className="bg-white rounded-4 shadow-sm py-2 px-2 px-lg-5">
          <h4 className="mt-3 w-auto">مشخصات فنی</h4>

          <div className="mt-3 ms-4 mb-4 mx-auto rounded-4">
            <ProductInfo productType={productType} data={data} />
          </div>
        </div>
      </Col>

      {/* second col */}
      <ProductPageResBuyBtn data={data} formattedPrice={formattedPrice} />
    </Row>
  );
}

export default ProductPageDecSection;
