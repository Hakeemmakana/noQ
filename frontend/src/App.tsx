
import { Route, Routes } from 'react-router-dom'

import UserRouter from './router/UserRouter'
import HotelAdminRouter from './router/HotelAdminRouter'
import AdminRouter from './router/AdminRouter'

function App() {

  return (
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/admin/*' element={<AdminRouter/>}/>
        <Route path='/hotelAdmin/*' element={<HotelAdminRouter/>}/>
      </Routes>
  )
}

export default App
