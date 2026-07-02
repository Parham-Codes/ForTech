import DashboardCard from "../../../components/panelComponents/dashboardCard/dashboardCard";
import { Col, Row } from "react-bootstrap";
import { BsBox2Heart, BsCart3, BsPeopleFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa6";
import DashBoardNewOrders from "../../../components/panelComponents/dashBoardNewOrders/dashBoardNewOrders";
import { useEffect, useState } from "react";
import axios from "axios";
import DbHttpAddress from "../../../dbHttpAddress";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [isLoading , setIsLoading] = useState(false)
  const [isOrderNew , setIsOrderNew] = useState(false)
  const [newOrders , setNewOrders] = useState([])
  const [allOrderCount , setAllOrderCount] = useState(0)
  const [userCount , setUserCount] = useState(0)
  const [productCount , setProductCounr] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    const fetchNewOrders = async () => {
      try{

        const products = await axios.get(`${DbHttpAddress}/products`)
        setProductCounr(products.data.length)

        const allorders = await axios.get(`${DbHttpAddress}/orders`)
        setAllOrderCount(allorders.data.length)

        const users = await axios.get(`${DbHttpAddress}/users`)
        setUserCount(users.data.length)

        const pendingOrders = await axios.get(`${DbHttpAddress}/orders?status=در%20انتظار%20تایید`)
        if (pendingOrders.data.length === 0) {
          setNewOrders([])
          return;
        }

        setNewOrders(pendingOrders.data)

      }
      catch (error){
        toast.error('مشکلی پیش آمده')
        console.log(error);
      }
      finally{
        setIsLoading(false)
      }
    }

    fetchNewOrders()
  } , [])

  return (
    <>
      <div className="my-5 mx-md-5 ">
        <h2 className="panelTIcolor">داشبورد</h2>

        <div className="w-100 mt-4">
          <Row xs={1} md={3} lg={3} xl={4} className="mx-auto h-auto gy-4">
            <Col>
              <DashboardCard btnTo='/admin/products' icon={<BsCart3 className="fs-5" style={{color: 'rgb(33, 150, 83)'}} />} iconBgColor={'rgba(33, 150, 83, 0.16)'} btnText='مدیریت' count={productCount} text='محصولات'/>
            </Col>
            <Col>
              <DashboardCard btnTo='/admin/users' icon={<BsPeopleFill className="fs-5" style={{color: 'rgb(95, 74, 254)'}} />} iconBgColor={'rgba(95, 74, 254, 0.16)'} btnText='مدیریت' count={userCount} text='کاربران'/>
            </Col>
            <Col>
              <DashboardCard btnTo='/admin/orders' icon={<FaChartLine className="fs-5" style={{color: 'rgb(247, 144, 9)'}} />} iconBgColor={'rgba(247, 144, 9, 0.16)'} btnText='مدیریت' count={allOrderCount} text='فروش'/>
            </Col>
            <Col>
              <DashboardCard btnTo='/admin/orders' icon={<BsBox2Heart className="fs-5" style={{color: 'rgb(197, 74, 74)'}} />} iconBgColor={'rgba(243, 83, 83, 0.16)'} btnText='بررسی' count={newOrders.length > 0 ? newOrders.length : 0} text='سفارش های جدید'/>
            </Col>
          </Row>
        </div>

        <div className="my-5 mx-2 mx-md-3">
          <h2 className="panelTIcolor">سفارش های جدید</h2>
          <DashBoardNewOrders orders={newOrders} isLoading={isLoading} />
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;
