import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/HomePage'
import Login from '../pages/auth/Login'
import SingupUser from '../pages/auth/SingupUser'
import RegisterRestaurant from '../pages/auth/RegisterRestaurant'

const UserRouter = () => {
    
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<SingupUser/>}/>
        <Route path='/register-restaurant' element={<RegisterRestaurant/>}/>
    </Routes>
  )
}

export default UserRouter
