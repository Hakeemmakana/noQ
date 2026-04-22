import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperAdminLogin from '../pages/auth/SuperAdminLogin'

export default function AdminRouter() {
  return (
    <Routes>
        <Route path='/login' element={<SuperAdminLogin/>}/>
    </Routes>
  )
}
