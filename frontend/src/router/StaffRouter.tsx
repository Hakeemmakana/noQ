import { Navigate, Route, Routes } from "react-router-dom";
import ChefLayout from "../layout/staff/cheff/ChefLayout";
import WaiterLayout from "../layout/staff/waiter/WaiterLayout";
import NewOrdersPage from "../features/staff/chef/newOrder/pages/accpetedOrder";
import AcceptedOrdersPage from "../features/staff/chef/acceptedOrder/pages/AcceptedOrderPage";
import ReadyForServingPage from "../features/staff/chef/readyForServing/pages/ReadyForServePage";
import CompleatedOrdersPage from "../features/staff/chef/compleatedOrders/pages/CompleatedOrdersPage";
import OrdersPageWaiter from "../features/staff/waiter/orders/pages/OrdersPageWaiter";
import CompletedOrdersPageWaiter from "../features/staff/waiter/completedOrders/pages/CompletedOrdersPageWaiter";
import QuickOrderPage from "../features/staff/waiter/quickOrder/pages/QuickOrderPage";
import ServiceOrderPage from "../features/staff/waiter/serviceOrder/pages/ServiceOrder";

export default function StaffRouter(){
    return (
         <Routes>
      <Route path="/" element={<Navigate to="/staff/chef/" replace />} />

      <Route path="/chef" element={<ChefLayout />}>
      <Route path="/chef" element={<Navigate to="/staff/chef/new-orders" replace />} />
        <Route path="dashboard" element={<div>Chef Dashboard</div>} />
        <Route path="new-orders" element={<NewOrdersPage/>} />
        <Route path="accepted-orders" element={<AcceptedOrdersPage/>} />
        <Route path="ready-for-serving" element={<ReadyForServingPage/>} />
        <Route path="completed-orders" element={<CompleatedOrdersPage/>} />
      </Route>

      <Route path="/waiter" element={<WaiterLayout />}>
      <Route path="/waiter" element={<Navigate to="/staff/waiter/service-order" replace />} />
        <Route index path="service-order" element={<ServiceOrderPage/>} />
        <Route path="orders" element={<OrdersPageWaiter/>} />
        <Route path="quick-items" element={<QuickOrderPage/>} />
        <Route path="completed-orders" element={<CompletedOrdersPageWaiter/>} />
        <Route path="billing" element={<div>Billing</div>} />
      </Route>
    </Routes>
    )
}