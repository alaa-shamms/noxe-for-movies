import React from 'react'
import { Link , NavLink } from 'react-router-dom'
import navLogo from "../../logo-dark.webp"

export default function Navbar({userData,logOut}) {

  return<>
  <nav className="navbar navbar-expand-lg  nav_bg d-flex align-items-center">
  <div className="container-fluid text-white">
    <Link className="navbar-brand text-white lightColor logoNav" to="/"><img src={navLogo}  /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      {/* <span className="navbar-toggler-icon "></span> */}
      <span className='text-white'><i className="fa-solid fa-bars"></i></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {/*left of nav  */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userData!=null?
        // loged
        <>
          <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"}  aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} to="/movies">Movies</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} to="/tv">Tv show</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} to="/person">People</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} to="/trending">Trending</NavLink>
        </li>
        </>
        
        :
        // not loged
        null
        }

      </ul>
      {/* right of nav */}



      {/* you are loged or not */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData==null?
        // not loged
        <>
          <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} aria-current="page" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive==true?"nav-link press text-white":"nav-link  text-white"} to="/register">Register</NavLink>
        </li>
        </>
        :
        // loged
        <>
          <ul className="navbar-nav nav_bg me-2 mt-3 mt-xl-0">
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
              settings
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
              <li><NavLink className="dropdown-item text-danger font-sm text-white" to="/updateLogedPassword" >update password</NavLink></li>
                <li><NavLink className="dropdown-item text-danger font-sm text-white" to="/UpdateLoggeduserdata" >update information</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <Link onClick={()=>logOut()} className="dropdown-item  " >Logout</Link>
              </ul>
            </li>
          </ul>
          <div className='nav-item d-flex align-items-center me-3 mt-3 mt-xl-0'>
            <i className="fab fa-facebook ms-1"></i>
            <i className="fab fa-twitter ms-2"></i>
            <i className="fab fa-youtube ms-2"></i>
            <i className="fab fa-instagram ms-2"></i>
            <i className="fab fa-soundcloud ms-2"></i>
          </div>
        </>

        }
    
      </ul>



    </div>
  </div>
</nav>
  </>
}
