import { Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import SingupUser from '../features/auth/pages/RgisterUser'
import TwoStepVerification from '../features/auth/pages/OtpVerification'
import ForgetPass from '../features/auth/pages/ForgetPass'
import ResetPassword from '../features/auth/pages/ResetPassword'
import AdminLogin from '../features/auth/pages/AdminLogin'
import UserAuthRoute from '../guards/UserAuthRoute'
import AdminAuthRoute from '../guards/AdminAuthRoute'
import { GoogleOAuthProvider } from '@react-oauth/google'
import UserManagementPage from '../features/admin/users/page/UserManagementPage'

const AuthRouter = () => {

  return (
    <Routes>
      <Route path='/login' element={
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UserAuthRoute>
            <Login />
          </UserAuthRoute>
        </GoogleOAuthProvider>
      } />
      <Route path='/user' element={<UserManagementPage/>}/>
      <Route path='/singup' element={<UserAuthRoute><SingupUser /></UserAuthRoute>} />
      <Route path='/verify-otp' element={<UserAuthRoute><TwoStepVerification /></UserAuthRoute>} />
      <Route path='/forgot-password' element={<UserAuthRoute><ForgetPass /></UserAuthRoute>} />
      <Route path='/reset-password' element={<UserAuthRoute><ResetPassword /></UserAuthRoute>} />

      <Route path='/adminLogin' element={<AdminAuthRoute><AdminLogin /></AdminAuthRoute>} />

    </Routes>
  )
}

export default AuthRouter