
import { Route, Routes } from 'react-router-dom'

import UserRouter from './router/UserRouter'
import AdminRouter from './router/AdminRouter'
import AuthRouter from './router/AuthRouter'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster position='top-center'/>
    <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/auth/*'element={<AuthRouter/>}/>
        <Route path='/admin/*' element={<AdminRouter/>}/>
      </Routes>
      </>
  )
}

export default App
