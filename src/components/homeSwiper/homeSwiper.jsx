import "./homeSwiper.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import axios from "axios";
import ProductCard from "../productCard/productCard";
import DbHttpAddress from "../../dbHttpAddress";
import { Link } from "react-router-dom";
import { HiFire } from "react-icons/hi2";
import SkeletonLoading from "../skeletonLoading/skeletonLoading";

function HomeSwiper({ name, productCount, page, rout }) {
  let [slideProducts, setSlideProduct] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);
  let [skeleton, setSkeleton] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${DbHttpAddress}/products?_page=${page}&_limit=${productCount}`,
        );

        setSlideProduct(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching products : ", error);
        setIsLoaded(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-100 px-2  px-lg-3 py-1 my-4 rounded-4">
      <div style={{ width: "100%", margin: "0 auto", overflow: "hidden" }}>
        <div className="PslideText">
          <div className="right">
            <span className="secColor">
              <HiFire size={"28px"} />
            </span>
            <div className="ms-1 fw-bold fs-5">{name}</div>
          </div>
          <div className="left ">
            <Link to={rout} className="text-decoration-none text-black ">
              <div className="fw-bold">نمایش همه</div>
            </Link>
          </div>
        </div>
        <Swiper
          style={{ width: "90%" }}
          simulateTouch={true}
          grabCursor={false}
          cssMode={false}
          navigation={true}
          pagination={false}
          keyboard={true}
          modules={[Navigation, Pagination, Keyboard]}
          breakpoints={{
            0:{
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1500: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          className="hot-products-swiper"
        >
          {isLoaded
            ? slideProducts.map((product) => (
                <SwiperSlide key={product._id.$oid}>
                  <ProductCard productData={product} />
                </SwiperSlide>
              ))
            : skeleton.map((item) => (
                <SwiperSlide key={item}>
                  <SkeletonLoading />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSwiper;
