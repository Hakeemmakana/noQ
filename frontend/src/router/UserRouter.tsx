import { Route, Routes } from 'react-router-dom'
import NoQApp from '../features/user/table/pages/TableEntry'
import AppLayout from '../layout/user/AppLayout'


const UserRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />} >
        <Route index element={<NoQApp />} />
        <Route path='home' element={<NoQApp />} />
      </Route>
    </Routes>
  )
}

export default UserRouter
