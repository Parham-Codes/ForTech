import { useParams } from "react-router-dom";
import "./AdminProductsEditPage.css";
import AdminMobileEdit from "../../../components/panelComponents/productEdit/mobileEdit";
import AdminLaptopEdit from "../../../components/panelComponents/productEdit/laptop";


function AdminProductsEditPage() {
  const productID = useParams().adminProductID;


  return (
    <>
      {productID.includes("P") ? (
        <AdminMobileEdit />
      ) : productID.includes("lap") ? (
        <AdminLaptopEdit />
      ) : (
        ""
      )}
    </>
  );
}

export default AdminProductsEditPage;
