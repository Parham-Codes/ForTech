import "./hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import image1 from "../../../assets/image/hero/DHPBC-1-1915x399.png";
import image2 from "../../../assets/image/hero/DHPBC-2-1915x399.png";
import image3 from "../../../assets/image/hero/DHPBC-3-1915x399.png";

import imageMobile1 from "../../../assets/image/mobileHero/0109091_img_7291.jpeg.webp";
import imageMobile2 from "../../../assets/image/mobileHero/0109667_640x480-xiaomi.jpeg.webp";
import imageMobile3 from "../../../assets/image/mobileHero/0109675_640x480-powerbank.jpeg.webp";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true} // ✅ حالت لوپ با تنظیم ساده فعال شد
        pagination={{ clickable: true, dynamicBullets: true }}
        className="mySwiper d-none d-lg-block"
      >
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to='/products/laptops' >
            <div className="slide-content">
              <img className="" src={image1} />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to='/products' >
            <div className="slide-content">
              <img className="" src={image2} />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to='/products' >
            <div className="slide-content">
              <img className="" src={image3} />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true} // ✅ حالت لوپ با تنظیم ساده فعال شد
        pagination={{ clickable: true, dynamicBullets: true }}
        className="mySwiper d-lg-none bg-white pb-4 "
      >
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to="/products/laptops">
            <div className="slide-content mobileHero">
              <img width={640} height={480} className="" src={imageMobile1} />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to="/products/phones">
            <div className="slide-content mobileHero">
              <img className="" src={imageMobile2} />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="cursorPointer w-100 overflow-hidden">
          <Link to="/products/phones">
            <div className="slide-content mobileHero">
              <img className="" src={imageMobile3} />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default HeroSection;
