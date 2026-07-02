import "./productPage.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DbHttpAddress from "../../dbHttpAddress";
import { Col, Row } from "react-bootstrap";
import ProductShortInfo from "../../components/productPageComponents/productShortInfo/productShortInfo";
import HomeSwiper from "../../components/homeSwiper/homeSwiper";
import ProductHelmet from "../../components/productPageComponents/productHelmet/productHelmet";
import Skeleton from "react-loading-skeleton";
import ProductPageHeader from "../../components/productPageComponents/productPageHeader/productPageHeader";
import ProductPageGuaranteeBadges from "../../components/productPageComponents/productPageGuaranteeBadges/productPageGuaranteeBadges";
import ProductPageDecSection from "../../components/productPageComponents/productPageDecSection/productPageDecSection";

function ProductPage() {
  const [data, setData] = useState({});
  const productId = useParams().id;
  const [productType, setProductType] = useState("");
  const pageLocation = useLocation().pathname;
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${DbHttpAddress}/products/${productId}`,
        );

        setData(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching products : ", error);
        if (error.response?.status == 404) {
          navigate("/not-found");
        }
        setIsLoaded(false);
      }
    };

    fetchProduct();

    if (pageLocation.includes("phones")) {
      setProductType("phone");
    }
    if (pageLocation.includes("laptops")) {
      setProductType("laptop");
    }
  }, [productId]);

  const formattedPrice = data?.price ? Number(data.price).toLocaleString() : "";

  console.log(productType , pageLocation);
  
  return (
    <>
      <ProductHelmet data={data} />

      <div className="Mycontainer px-0 px-lg-3">
        {isLoaded ? (
          <>
            <ProductPageHeader data={data} />

            <ProductShortInfo data={data} productType={productType} />

            <ProductPageGuaranteeBadges />

            <ProductPageDecSection
              data={data}
              productType={productType}
              formattedPrice={formattedPrice}
            />

            <HomeSwiper
              key={productType}
              rout={`/products/${productType}s`}
              page={
                productType == "phone" ? 2 : productType == "laptop" ? 4 : ""
              }
              name="محصولات مرتبط"
              productCount={8}
            />
          </>
        ) : (
          <Row
            xs={1}
            lg={2}
            className="mt-2 mx-auto justify-content-center align-items-center w-100 overflow-y-hidden"
          >
            <Col>
              <div
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  margin: "20px auto",
                  textAlign: "center",
                }}
              >
                <Skeleton height={450} style={{ width: "90%" }} />

                <Skeleton
                  height={80}
                  style={{ marginTop: "20px", width: "80%" }}
                />
              </div>
            </Col>
            <Col>
              <div
                style={{
                  width: "90%",
                  padding: "5px",
                  height: "600px",
                  borderRadius: "10px",
                  margin: "0 auto    ",
                }}
              >
                <Skeleton height={350} />
                <Skeleton height={60} style={{ marginTop: "10px" }} />
                <Skeleton
                  height={30}
                  width="100%"
                  style={{ float: "left", marginTop: "30px" }}
                />
                <Skeleton
                  height={60}
                  style={{ float: "left", marginTop: "20px" }}
                />
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default ProductPage;
