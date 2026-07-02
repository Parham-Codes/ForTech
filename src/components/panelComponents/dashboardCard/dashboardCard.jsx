import { IconBase } from "react-icons";
import "./dashboardCard.css";
import { Link } from "react-router-dom";

function DashboardCard({ iconBgColor, icon, text, count, btnText , btnTo }) {
  return (
    <div className="dashboardCard rounded-3 d-flex">
      <div className="paneltTXcolor p-3">
        <div
          className="rounded rounded-circle d-flex justify-content-center align-items-center mb-2"
          style={{
            backgroundColor: iconBgColor,
            width: "50px",
            height: "50px",
          }}
        >
          {icon}
        </div>
        <p className="mb-1 ms-1" style={{ fontSize: "13px" }}>
          {text}
        </p>
        <h2 className="fw-bold">{count} عدد</h2>
      </div>
      <div>
        <Link to={btnTo} className="paneltTXcolor text-decoration-none">
          <button
            className="dashboardCartBtn px-4 py-1 rounded-2 mt-4 ms-1"
            style={{ color: "#ABAAB8" }}
          >
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardCard;
