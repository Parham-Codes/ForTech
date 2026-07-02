import "./home.css";

import { Col, Row } from "react-bootstrap";
import HomeSwiper from "../../components/homeSwiper/homeSwiper";
import firstRightImg from '../../assets/image/posters/DHPFP-2.webp'
import firstLeftImg from '../../assets/image/posters/DHPFP-3.webp'
import firstMiddleImg from '../../assets/image/posters/DHPFP-1.webp'
import secondRightImg from '../../assets/image/posters/DHPMA.webp'
import secondLeftImg from '../../assets/image/posters/DHPMA-1.webp'
import HeroSection from "../../components/header&hero/hero/hero";

function Home() {
  
  

  return (
    <>
      <HeroSection />
      
      <div className="Mycontainer my-4">

        <HomeSwiper rout='/products' page={3} name="محصولات جدید" productCount={8}/>
        
        <Row xs={1} sm={1} md={2} lg={3}   className="w-100 mx-auto imgRow justify-content-center align-items-center gy-3">
          <Col>
            <img src={firstRightImg} />
          </Col>
          <Col>
            <img src={firstMiddleImg} />
          </Col>
          <Col>
            <img src={firstLeftImg} />
          </Col>
        </Row>

        <HomeSwiper rout='/products/phones' page={1} name="موبایل های پرفروش" productCount={8}/>

        <Row xs={1} sm={1} md={2} lg={2}   className=" w-100 mx-auto imgRow justify-content-center align-items-center gy-3">
          <Col>
            <img src={secondRightImg} />
          </Col>
          <Col>
            <img src={secondLeftImg} />
          </Col>
        </Row>

        <HomeSwiper rout='/products/laptops' page={4} name="لپ تاپ های پرفروش" productCount={8}/>

        

      </div>



    </>
  );
}

export default Home;
