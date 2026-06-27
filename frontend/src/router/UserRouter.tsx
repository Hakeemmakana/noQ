import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/user/AppLayout'
import RestaurantOrderingLanding from '../features/user/table/pages/RestaurantOrderingLanding'
import ProfilePage from '../features/user/profile/pages/ProfilePage'
import MenuListPage from '../features/user/menu-items/pages/userManuPage'
import CartPage from '../features/user/cart/pages/CartPage'
import CheckoutPage from '../features/user/checkout/pages/CheckoutPage'
import { PaymentPage } from '../features/user/checkout/service/stripeService'
import OrdersPage from '../features/user/orders/pages/OrdersPage'
import OrderDetailsPage from '../features/user/orders/pages/OrderDetailsPage'
import OrderSuccessPage from '../features/user/orders/pages/OrderSuccessPage'


const UserRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />} >
        <Route index element={<RestaurantOrderingLanding />} />
        {/* <Route path='home' element={<NoQApp />} /> */}
        <Route path='/home' element={<RestaurantOrderingLanding />} />
        <Route path='/tables/:hotelId/:tableId' element={<RestaurantOrderingLanding />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/menu' element={<MenuListPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/checkout/payment' element={<PaymentPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/order/:id' element={<OrderDetailsPage  />} />
        <Route path='/orderSuccess' element={<OrderSuccessPage  />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
