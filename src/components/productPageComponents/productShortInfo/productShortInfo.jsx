import React from "react";
import { Row } from "react-bootstrap";

function ProductShortInfo({ data, productType }) {
  return (
    <>
      <Row className="w-100 my-4 py-2 px-3 px-lg-5 bg-white mx-auto rounded-4 shadow-sm">
        <h4 className="mt-3 w-auto">ویژگی ها </h4>

        {productType == "phone" ? (
          <div className="pBgGray mt-1 mb-4 mx-auto rounded-4">
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              پردازنده : <span className="fw-bold">{data?.phoneInfo?.cpu}</span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              حافظه رم : <span className="fw-bold">{data?.phoneInfo?.ram}</span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              صفحه نمایش :{" "}
              <span className="fw-bold">
                {data?.phoneInfo?.display.size_in} اینچ
              </span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              باتری :{" "}
              <span className="fw-bold">
                {data?.phoneInfo?.battery.capacity_mAh} میلی آمپر
              </span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              تراشه :{" "}
              <span className="fw-bold">{data?.phoneInfo?.chipset}</span>
            </p>
          </div>
        ) : productType == "laptop" ? (
          <div className="pBgGray mt-1 mb-4 mx-auto rounded-4">
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              پردازنده :{" "}
              <span className="fw-bold">{data?.laptopInfo?.cpu}</span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              حافظه رم :{" "}
              <span className="fw-bold">{data?.laptopInfo?.ram}</span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              صفحه نمایش :{" "}
              <span className="fw-bold">{data?.laptopInfo?.screen}</span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              باتری :{" "}
              <span className="fw-bold">
                {data?.laptopInfo?.battery} میلی آمپر
              </span>
            </p>
            <hr className="border-white border-5 mt-0 mb-0" />
            <p className="m-0 p-3" style={{ fontSize: "17px" }}>
              کارت گرافیک :{" "}
              <span className="fw-bold">{data?.laptopInfo?.gpu}</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </Row>
    </>
  );
}

export default ProductShortInfo;
