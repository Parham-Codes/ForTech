import "./adminOrders.css";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DbHttpAddress from "../../../dbHttpAddress";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/paginationComponent";

function AdminOrders() {
  const [orders, setOrder] = useState([]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allorders = await axios.get(`${DbHttpAddress}/orders`);

        if (allorders.data.length === 0) {
          toast.error("محصولی وحود ندارد");
          return;
        }

        setOrder(allorders.data);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی پیش آمده");
      }
    };

    fetchOrders();
  }, []);

  

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
    <div className="w-100 py-5">
      <h2 className="panelTIcolor mb-2 ms-5">لیست سفارشات</h2>

      <div className="px-4  ">
        <div className="orderListTable rounded rounded-3 table-container w-100 mt-4">
          <table className="newOrderTable rounded overflow-hidden rounded-3 w-100 ">
            <thead className="">
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
                      <td className="paneltTXcolor text-center">
                        {item.status}
                      </td>
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
                    سفارشی یافت نشد !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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

export default AdminOrders;
