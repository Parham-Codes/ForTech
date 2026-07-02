import './productPageHeader.css'
import { Row } from "react-bootstrap";
import ProductGallery from "../../productPageSwiper/productGallery";
import ProductPageBuyBtn from "../productPageButBtn/productPageBuyBtn";

function ProductPageHeader({ data }) {

  const formattedPrice = data?.price ? Number(data.price).toLocaleString("fa-IR") : "";

  return (
    <>
      <Row
        xs={1}
        lg={2}
        className="productHeaderSection w-100 mb-4 mt-lg-3 py-2 px-2 bg-white mx-auto align-items-center shadow-sm"
      >
        <div className="productGalleryDiv">
          <div>
            {data?.thumbnail && (
              <ProductGallery
                thumbnail={data.thumbnail}
                galleryImgs={data.images}
              />
            )}
          </div>
        </div>
        <div className="productleftContainer pe-lg-5">
          <div className="productDesc pt-5 pb-3">
            <h2 className="fs-4">{data.card_description}</h2>
            <h5 className="text-black-50 py-2" style={{ fontSize: "14px" }}>
              {data?.short_description}
            </h5>
            <hr className="border-2 border-black" />
            <p className="fw-bold">
              شرکت سازنده : <span className="text-black-50">{data?.brand}</span>
            </p>
            <p className="fw-bold">
              مدل : <span className="text-black-50">{data?.model}</span>
            </p>
            <p className="fw-bold">
              گارانتی : <span className="text-black-50"> 18 ماهه شرکتی</span>
            </p>
          </div>
          <div className="productPriceDiv">
            <p className="fw-bold">
              فروشنده : <span className="text-black-50">ForTech</span>
            </p>
            <div>
              <p className="priceLabel fw-bold fs-3 text-end pe-2  d-flex justify-content-end align-items-center">
                {formattedPrice}
                <span className="ms-3 text-black-50">تومان</span>
              </p>
              <ProductPageBuyBtn data={data} />
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}

export default ProductPageHeader;
