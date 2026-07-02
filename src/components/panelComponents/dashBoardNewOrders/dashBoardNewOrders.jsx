import { useNavigate } from "react-router-dom";
import "./dashBoardNewOrders.css";
import Pagination from "../../pagination/paginationComponent";
import { useEffect, useState } from "react";

function DashBoardNewOrders({ orders, isLoading }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = sortedOrders.slice(start, end);
  const pageCount = Math.ceil(sortedOrders.length / itemsPerPage);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount || 1);
    }
  }, [pageCount]);

  return (
    <div className="table-container w-100">
      <table className="newOrderTable w-100 rounded overflow-hidden rounded-3 mt-4">
        <thead>
          <tr>
            <th className="paneltTXcolor text-center">آیدی سفارش</th>
            <th className="paneltTXcolor text-center">نام مشتری</th>
            <th className="paneltTXcolor text-center">وضعیت سفارش</th>
            <th className="paneltTXcolor text-center">مبلغ</th>
            <th className="paneltTXcolor text-center">تاریخ ثبت</th>
            <th className="paneltTXcolor text-center">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((item) => {
              return (
                <tr key={item.id} className="border-top border-bottom">
                  <td className="paneltTXcolor text-center">{item.id}</td>
                  <td className="paneltTXcolor text-center">
                    {item.customer.fullName}
                  </td>
                  <td className="paneltTXcolor text-center">{item.status}</td>
                  <td className="paneltTXcolor text-center">
                    {Number(item.totalPrice).toLocaleString("fa-IR")}
                  </td>
                  <td className="paneltTXcolor text-center">
                    {formatDate(item.date)}
                  </td>
                  <td className="paneltTXcolor text-center cursorPointer">
                    <button
                      onClick={() => navigate(`/admin/orders/${item.id}`)}
                      style={{ all: "unset" }}
                    >
                      جزئیات
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="paneltTXcolor text-center fs-4">
                سفارش جدیدی ندارید!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <Pagination
          pageCount={pageCount}
          forcePage={page}
          onPageChange={(newPage) => {
            setPage(newPage);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
}

export default DashBoardNewOrders;
