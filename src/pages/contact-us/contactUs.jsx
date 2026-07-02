import React from "react";
import { Col, Row } from "react-bootstrap";

function ContactUs() {

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="Mycontainer py-5 px-3 px-lg-5">
      <div className="bg-white w-100 rounded rounded-3 ">
        <Row
          xs={1}
          lg={2}
          className="justify-content-center align-items-center gy-3"
        >
          <Col className="">
            <div className="">
              <h5 className="text-center mt-1">ارتباط با کارشناسان :</h5>
              <form onSubmit={submitHandler} action="d-flex contactUsContainer">
                <Row className="px-5 py-1 contactUsContainerRow">
                  <label className="mb-1" htmlFor="firstName">نام :</label>
                  <input
                    className="mb-3 pBgGray border-1 rounded p-1"
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                  />

                  <label className="mb-1" htmlFor="lastName">نام خانوادگی :</label>
                  <input
                    className="mb-3 pBgGray border-1 rounded p-1"
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                  />

                  <label className="mb-1" htmlFor="phoneNumber">شماره تلفن :</label>
                  <input
                    className="mb-3 pBgGray border-1 rounded p-1"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                  />

                  <label className="mb-1" htmlFor="email">ایمیل :</label>
                  <input
                    className="mb-3 pBgGray border-1 rounded p-1"
                    id="email"
                    name="email"
                    type="email"
                    required
                  />

                  <label className="mb-1" htmlFor="message">پیام :</label>
                  <textarea
                    className="mb-3 pBgGray border-1 rounded p-1"
                    rows={4}
                    id="message"
                    name="message"
                    placeholder="لطفا پیام مورد نظر خود را وارد کنید تا کارشناسان ما در سریع ترین زمان ممکن با شما تماس بگیرند!"
                  />
                  <button
                    className="btn btn-primary mt-3 mb-1"
                    style={{ width: "70px" }}
                    type="submit"
                  >
                    ارسال
                  </button>
                </Row>
              </form>
            </div>
          </Col>
          <Col className="px-4">
          <hr className="w-75 mx-auto d-lg-none"/>
            <h5 className="mt-3 text-center text-lg-start">
              برای ارتباط با ما می توانید از طریق شماره های زیر و یا ادرس ایمیل
              مجموعه تماس حاصل فرمائید .
            </h5>
            <div className="text-center text-lg-end px-4 px-lg-5 pt-3">
              <p className="fs-5">
                021-2626
                <br />
                0910-1878456
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ContactUs;
