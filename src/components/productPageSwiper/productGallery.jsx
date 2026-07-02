import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules"; // ✅ درست ترین 

import "swiper/css";
import "swiper/css/thumbs";


function ProductGallery({ thumbnail, galleryImgs }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const images = [thumbnail, ...(galleryImgs || [])];

  if (!thumbnail && (!galleryImgs || galleryImgs.length === 0)) {
    return null;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto 10px auto" }}>

      <Swiper
        modules={[Thumbs]}          
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        style={{ marginBottom: "15px" }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`product-${index}`}
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>


      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}  
        watchSlidesProgress
        slidesPerView={4}          
        spaceBetween={10}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`thumb-${index}`}
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer",
                border: "1px solid #858585",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductGallery;
