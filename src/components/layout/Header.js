import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      <NavLink to="/" className={({isActive})=> isActive?'text-primary':''} > Homes </NavLink>
      <NavLink to="/movies" className={({ isActive }) => isActive ? 'text-primary' : ''} >Movies</NavLink>
    </header>
  )
}
