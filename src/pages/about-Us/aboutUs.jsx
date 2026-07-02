import { Col, Row } from "react-bootstrap";
import "./aboutUs.css";
import image from "../../assets/image/aboutUS/developers-doing-discussion-about-wireframe.jpg";
import logo from '../../assets/image/logo/logo.png'

function AboutUs() {
  return (
    <div className="Mycontainer ">
      {/* <div className="aboutLogoContainer mx-auto bg-white rounded rounded-3 my-3">
        <img src={logo} className="aboutLogo d-block mx-auto" />
      </div> */}
      <Row className="align-items-center justify-content-center py-3 px-lg-5 mx-auto gy-4">
        <Col className="text-center" xs={12} lg={6}>
          <img
            src={image}
            className="img-fluid rounded rounded-5 overflow-hidden"
          />
        </Col>
        <Col xs={12} lg={6} className="pe-md-4 pt-lg-5">
          <h2 className="lalezar">درباره ما</h2>
          <p className="fs-6 justified">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجل در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>

          <hr className=" text-light border border-black my-4" />
        </Col>
        <Col>
          <p className="fs-6 justified p-4 rounded rounded-4 bg-white ">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی
            در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد در این
            صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
            شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
            دستاوردهای اصلی
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUs;
