import { Route, Routes } from 'react-router-dom'
import NoQApp from '../features/user/table/prvPages/TableEntry'
import AppLayout from '../layout/user/AppLayout'
import RestaurantOrderingLanding from '../features/user/table/pages/RestaurantOrderingLanding'
import ProfilePage from '../features/user/profile/pages/ProfilePage'


const UserRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />} >
        <Route index element={<RestaurantOrderingLanding />} />
        {/* <Route path='home' element={<NoQApp />} /> */}
        <Route path='/home' element={<RestaurantOrderingLanding />} />
        <Route path='/tables/:hotelId/:tableId' element={<RestaurantOrderingLanding />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
