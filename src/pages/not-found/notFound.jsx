import { Link } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  return (
    <>

      <section className="page_404">
        <div className="container mt-5 pt-5 pt-sm-3">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center align-items-center">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg  rounded overflow-hidden">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">ظاهرا مسیر اشتباهی رو اومدی!</h3>

                  <p>صفحه ای که دنبالشی وجود نداره!</p>

                  <Link to="/" className="link_404 rounded-3">
                    بازگشت به صفحه اصلی
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
