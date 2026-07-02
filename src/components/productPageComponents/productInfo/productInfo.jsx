import "./productInfo.css";

function ProductInfo({ data, productType }) {
  return (
    <>
      {productType == "phone" ? (
        <>
          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              سیستم عامل
            </div>
            <div className="productInfoData fw-bold">{data?.phoneInfo?.os}</div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              تراشه
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.chipset}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              پردازنده
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.cpu}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              کارت گرافیک
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.gpu}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              حافظه رم
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.ram}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              حافظه داخلی
            </div>
            <div className="productInfoData fw-bold d-flex flex-wrap">
              {data?.phoneInfo?.storage_options.map((item, index) => (
                <div key={index}>
                  <span className="me-3 fs-6"> {item} </span>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              سایز صفحه نمایش
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.display.size_in} اینچ
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              نوع صفحه نمایش
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.display.type}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              رزولوشن صفحه نمایش
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.display.resolution}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              نرخ نوسازی صفحه
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.display.refresh_rate_hz} هرتز
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              گنجایش باطری
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.battery.capacity_mAh} میلی آمپر
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              نوع شارژ
            </div>
            <div className="productInfoData fw-bold">
              {data?.phoneInfo?.battery.charging}
            </div>
          </div>
          <hr />
        </>
      ) : productType == "laptop" ? (
        <>
          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              پردازنده
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.cpu}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              کارت گرافیک
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.gpu}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              حافظه رم
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.ram}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              حافظه داخلی
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.ssd}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              سایز صفحه نمایش
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.screen}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              رزولوشن صفحه نمایش
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.display}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              وزن
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.weight}
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-start align-items-center my-3 w-auto">
            <div
              className="productInfoLabel"
              style={{ fontSize: "17px", width: "200px" }}
            >
              ظرفیت باطری
            </div>
            <div className="productInfoData fw-bold">
              {data?.laptopInfo?.battery}
            </div>
          </div>
          <hr />
        </>
      ) : (
        "productInfoLabel"
      )}
    </>
  );
}

export default ProductInfo;
