import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/admin/AppLayout'
// import DashboardPage from '../features/admin/dashboard/pages/DashboardPage'
import UserManagementPage from '../features/admin/users/page/UserManagementPage'
import StaffManagementPage from '../features/admin/staff/pages/StaffManagementPage'
import ProductCategoryPage from '../features/admin/category/pages/ProductCategoryPage'
import TablesPage from '../features/admin/table/pages/TablesPage'
import AdminProfilePage from '../features/admin/profile/pages/AdminProfilePage'
import ProductListPage from '../features/admin/products/pages/ProductListPage'
import AdminOrdersPage from '../features/admin/orders/pages/AdminOrdersPage'
import AdminOrderDetailsPage from '../features/admin/orders/pages/AdminOrderDetailsPage'


export default function AdminRouter() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route
          index
          element={<UserManagementPage />} 
        />

        {/* <Route
          path='/dashboard'
          element={<DashboardPage />}
          
        /> */}
        <Route
          path='/users'
          element={<UserManagementPage />}
          
        />
          <Route
            path='/staff'
            element={<StaffManagementPage/>}
            
          />
          <Route
            path='/categories'
            element={<ProductCategoryPage/>}
            
          />
          <Route
            path='/tables'
            element={<TablesPage/>}
            
          />
          <Route
            path='/profile'
            element={<AdminProfilePage/>}
            
          />
          <Route
            path='/menu'
            element={<ProductListPage/>}
            
          />
          <Route
            path='/orders'
            element={<AdminOrdersPage/>}
            
          />
          <Route
            path='/order/:id'
            element={<AdminOrderDetailsPage/>}
            
          />

      </Route>
    </Routes>
  )
}
