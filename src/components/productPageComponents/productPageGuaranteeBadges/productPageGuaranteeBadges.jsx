import { Col, Row } from 'react-bootstrap'
import { BsBox2, BsClock, BsCreditCard } from 'react-icons/bs'
import { TiTickOutline } from 'react-icons/ti'

function ProductPageGuaranteeBadges() {
  return (
    <Row
              xs={2}
              lg={4}
              className="w-100 my-4 py-2 px-2 bg-white mx-auto rounded-4 shadow-sm "
            >
              <Col className="d-flex flex-column justify-content-center align-items-center py-4">
                <TiTickOutline size="35px" />
                <span className="mt-2 fs-6 fw-bold">ضمانت اصل بودن کالا</span>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center py-4">
                <BsClock size="35px" />
                <span className="mt-2 fs-6 fw-bold">ارسال اکسپرس</span>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center py-4">
                <BsCreditCard size="35px" />
                <span className="mt-2 fs-6 fw-bold">پرداخت در محل</span>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center py-4">
                <BsBox2 size="35px" />
                <span className="mt-2 fs-6 fw-bold">بازگشت تا 7 روز</span>
              </Col>
            </Row>
  )
}

export default ProductPageGuaranteeBadges