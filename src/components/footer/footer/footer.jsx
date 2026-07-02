import "./footer.css";
import FooterCard from "../footerCard/footerCard";
import {
  FaBoxOpen,
  FaCreditCard,
  FaHeadset,
  FaMicrophoneAlt,
  FaPeopleCarry,
  FaRegListAlt,
} from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { BsInstagram, BsTelegram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import FooterIcon from "../footerIcon/footerIcon";
import firstFooterImg from "../../../assets/image/footer/anjoman.png";
import secondFooterImg from "../../../assets/image/footer/emalls.png";
import thirdFooterImg from "../../../assets/image/footer/enamad.png";
import forthFooterImg from "../../../assets/image/footer/nezam-senfi.png";
import fifthFooterImg from "../../../assets/image/footer/sabt.png";
import logo from "../../../assets/image/logo/logo.png";

function Footer() {
  return (
    <div className="bg-white w-100">
      <div className="Mycontainer pt-4 px-3">
        <Row
          xs={2}
          md={3}
          lg={6}
          className=" w-100 mx-auto justify-content-center align-items-center"
        >
          <Col>
            <FooterCard icon={<FaCreditCard />} text="خرید امن" />
          </Col>
          <Col>
            <FooterCard icon={<FaHeadset />} text="مشاوره رایگان" />
          </Col>
          <Col>
            <FooterCard icon={<FaMicrophoneAlt />} text="پشتیبانی بر خط" />
          </Col>
          <Col>
            <FooterCard icon={<FaPeopleCarry />} text="ارسال به سراسر کشور" />
          </Col>
          <Col>
            <FooterCard icon={<FaRegListAlt />} text="فاکتور رسمی" />
          </Col>
          <Col>
            <FooterCard icon={<FaBoxOpen />} text="بسته بندی ایمن" />
          </Col>
        </Row>
        <Row
          xs={1}
          lg={2}
          className="justify-content-center mx-auto align-items-center mt-3 pt-3 px-1 px-lg-4 border-top w-100 g-3"
        >
          <Col className="d-flex justify-content-center justify-content-lg-between align-items-center cursorDefault">
            <div className="border-end pe-4 d-flex flex-column justify-content-center align-items-center">
              <h1
                className="fst-italic lalezar secColor cursorDefault"
                style={{ fontSize: "50px" }}
              >
                <img src={logo} className="aboutLogo d-block mx-auto" style={{height: '100px'}} />
              </h1>
              <p className="" style={{ fontSize: "12px" }}>
                خرید لپ تاپ و کالای دیجیتال
              </p>
            </div>
            <div className="w-75 ps-2">
              <h4 className="fs-6">
                پشتیبانی و مشاوره: 1878456-0910 | 2626-021
              </h4>
              <h6 className="" style={{ fontSize: "12px" }}>
                تهران ، تقاطع کاشانی و طالقانی ، مجتمع اداری و تجاری تهران ،
                طبقه چهارم ، واحد 65
              </h6>
            </div>
          </Col>
          <Col>
            <div className=" d-flex  justify-content-center justify-content-lg-end align-items-center px-3 ">
              <FooterIcon icon={<BsInstagram />} />
              <FooterIcon icon={<BsTelegram />} />
              <FooterIcon icon={<BsWhatsapp />} />
              <FooterIcon icon={<BsYoutube />} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="pBgGray">
        <div className="Mycontainer">
          <Row className="justify-content-center align-items-center mx-auto footerListDiv px-4 py-5 mt-3 gy-4 ">
            <Col xs={12} md={3} lg={3}>
              <h4>پربازدید ترین ها</h4>
              <ul className="footerUl">
                <li>خرید لپ تاپ</li>
                <li>خرید مانیتور</li>
                <li>خرید گوشی</li>
                <li>خرید مک بوک</li>
                <li>خرید آیفون 17</li>
              </ul>
            </Col>
            <Col xs={12} md={3} lg={3}>
              <h4>پربازدید ترین ها</h4>
              <ul className="footerUl">
                <li>خرید لپ تاپ</li>
                <li>خرید مانیتور</li>
                <li>خرید گوشی</li>
                <li>خرید مک بوک</li>
                <li>خرید آیفون 17</li>
              </ul>
            </Col>
            <Col xs={12} md={3} lg={2}>
              <h4>پربازدید ترین ها</h4>
              <ul className="footerUl">
                <li>خرید لپ تاپ</li>
                <li>خرید مانیتور</li>
                <li>خرید گوشی</li>
                <li>خرید مک بوک</li>
                <li>خرید آیفون 17</li>
              </ul>
            </Col>
            <Col xs={12} md={12} lg={3} className="footerImg mx-auto">
              <h4 className="text-center">با خیال راحت خرید کنید</h4>
              <Row
                xs={5}
                className="d-flex flex-row justify-content-center align-items-center g-0 m-0 p-2 bg-white rounded-3 overflow-hidden "
              >
                <div>
                  <img src={firstFooterImg} alt="" />
                </div>
                <div>
                  <img src={secondFooterImg} alt="" />
                </div>
                <div>
                  <img src={thirdFooterImg} alt="" />
                </div>
                <div>
                  <img src={forthFooterImg} alt="" />
                </div>
                <div>
                  <img src={fifthFooterImg} alt="" />
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <h6 className="mx-auto text-center pb-1 pb-lg-3 px-1 text-black-50">
        کلیه حقوق این وبسایت متعلق به ParhamDev میباشد و کلیه حقوق محفوظ است.
      </h6>
    </div>
  );
}

export default Footer;
