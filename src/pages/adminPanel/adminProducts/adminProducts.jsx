import { useEffect, useState } from "react";
import "./adminProducts.css";
import toast from "react-hot-toast";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import { FaPencilAlt } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import Pagination from "../../../components/pagination/paginationComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import MobileAdd from "../../../components/panelComponents/productAdd/mobileAdd";
import LaptopAdd from "../../../components/panelComponents/productAdd/laptopAdd";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productType , setProductType] = useState('phone')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${DbHttpAddress}/products`);
        const reversed = res.data.reverse()
        setProducts(reversed);
      } catch (error) {
        toast.error("مشکلی در دریافت محصولات از دیتابیس پیش آمده");
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = products.slice(start, end);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount || 1);
    }
  }, [pageCount]);

  const deleteUserHandler = async (id) => {
    const result = await Swal.fire({
      title: "حذف محصول",
      text: "آیا از حذف این محصول مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${DbHttpAddress}/products/${id}`);

      toast.success("کاربر حذف شد");

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      toast.error("مشکلی پیش آمد");
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="adminPanelProductsDiv w-100">
          <div className="d-flex align-items-center justify-content-between mt-5">
            <h2 className="panelTIcolor ms-4">لیست محصولات</h2>
            <p className="paneltTXcolor m-0">
              {itemsPerPage} محصول از {products.length} محصول در هر صفحه
            </p>
            <button
              onClick={() => setIsAddProductOpen(!isAddProductOpen)}
              className="btn paneltTXcolor me-4"
            >
              اضافه کردن محصول جدید
            </button>
          </div>

          <div className=" w-100 px-5">
            <table className=" productListTable rounded overflow-hidden rounded-3 w-100 mt-4 mx-auto">
              <thead className="">
                <tr>
                  <th className="paneltTXcolor text-center">شماره محصول</th>
                  <th className="paneltTXcolor text-center">محصول</th>
                  <th className="paneltTXcolor text-center">ID</th>
                  <th className="paneltTXcolor text-center">موجودی</th>
                  <th className="paneltTXcolor text-center">قیمت</th>
                  <th className="paneltTXcolor text-center">اقدامات</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((item, index) => {
                    return (
                      <tr key={item.id} className="border-top border-bottom">
                        <td className="paneltTXcolor text-center">
                          {start + index + 1}
                        </td>
                        <td
                          className="paneltTXcolor text-center"
                          style={{ width: "35%" }}
                        >
                          <div className="d-flex justify-content-start align-items-center">
                            <img
                              className="productTableImg"
                              src={item.thumbnail}
                              alt={item.model}
                            />
                            <p className="my-0 ms-3">{item.model}</p>
                          </div>
                        </td>
                        <td className="paneltTXcolor text-center">
                          {item.id}
                        </td>
                        <td className="paneltTXcolor text-center">
                          {item.count_stock}
                        </td>
                        <td className="paneltTXcolor text-center">
                          {Number(item.price).toLocaleString("fa-IR")}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              navigate(`/admin/products/edit/${item.id}`)
                            }
                            className="btn paneltTXcolor text-center"
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            onClick={() => deleteUserHandler(item.id)}
                            className="btn paneltTXcolor text-center"
                          >
                            <BiTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="paneltTXcolor text-center fs-4">
                      کاربری یافت نشد !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
      </div>

      <div className="addProduct w-100">
        <div className={`addUserOverlay pt-5 w-100 ${isAddProductOpen ? "active" : ""}`}>

          <div className="position-absolute w-100 d-flex justify-content-center align-items-center pt-4" style={{top : '0'}}>
            <button onClick={() => setProductType('phone')} className="btn btn-primary me-3">phone</button>
            <button onClick={() => setProductType('laptop')} className="btn btn-primary">laptop</button>
          </div>
          {
            productType == 'phone' ? <MobileAdd cancelHandler={() => setIsAddProductOpen(false)} /> : productType == 'laptop' ? <LaptopAdd cancelHandler={() => setIsAddProductOpen(false)} /> : ''
          }

        </div>
      </div>
    </>
  );
}

export default AdminProducts;
