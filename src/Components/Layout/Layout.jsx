import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({userData,logOut}) {
  return <>
  <Navbar logOut={logOut} userData={userData}/>
  {/* children of layout */}
  <Outlet/>
  </>
}
