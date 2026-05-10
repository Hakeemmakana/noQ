import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/admin/AppLayout'
import DashboardPage from '../features/admin/dashboard/pages/DashboardPage'
import UserManagementPage from '../features/admin/users/page/UserManagementPage'


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

      </Route>
    </Routes>
  )
}
