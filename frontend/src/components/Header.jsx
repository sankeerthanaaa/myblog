import React from 'react'
import logo from '../assets/blogLogo.png'
import { NavLink } from 'react-router'
function Header() {
  return (
    <nav className='flex justify-between px-3 py-1 bg-stone-400 text-amber-950 items-center'>
        {/* <img src={logo} alt="" className="w-15 h-15 drop-shadow-lg" /> */}
        <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="MyBlog Logo"
          className="w-12 h-12 drop-shadow-lg"
        />
        <h1 className="text-2xl font-extrabold tracking-wide">
          MyBlog
        </h1>
      </div>
        <ul className='flex gap-8 text-2xl'>
            <li>
                <NavLink to="" className={({ isActive }) =>
                isActive ? "text-stone-200 font-extrabold" : "text-amber-950 font-extrabold"
                }>Home</NavLink>
            </li>
            <li>
                <NavLink to="register" className={({ isActive }) =>
                isActive ? "text-stone-200 font-extrabold" : "text-amber-950 font-extrabold"
                }>Register</NavLink>
            </li>
            <li>
                <NavLink to="login" className={({ isActive }) =>
                isActive ? "text-stone-200 font-extrabold" : "text-amber-950 font-extrabold"
                }>Login</NavLink>
            </li>
            {/* <li>
                <NavLink to="addarticle" className={({ isActive }) =>
                isActive ? "text-stone-200 font-extrabold" : "text-amber-950 font-extrabold"
                }>Add Article</NavLink>
            </li> */}
        </ul>
    </nav>    
)
}

export default Header