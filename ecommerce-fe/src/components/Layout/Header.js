import React from 'react';
import '../../styles/Header.css'
import Logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import SearchInput from '../Form/SearchInput';





function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div>
      {/* First part of the header with logo, search box, cart, and login button */}
      <div className="container-fluid bg-light text-black">
        <div className="row row-gap-3 py-3 px-5 pb-2">
          <div className="col-lg-3 col-sm-12">
            <NavLink to="/"><img className="img-fluid" style={{ width: '90px', height: '70px' }} src={Logo} alt="Logo" /></NavLink>

          </div>

          <div className="col-lg-6 col-sm-12">
            <SearchInput />
          </div>
          {!auth?.user ? (
            <>
              <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-end h-50">
                <NavLink to="/login" className="btn btn-primary head-btn">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary head-btn">Register</NavLink>
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="btn btn-primary head-btn"><FontAwesomeIcon icon={faCartArrowDown} /></NavLink>
                </Badge>
              </div>
            </>
          ) : (
            <>

              <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-end h-50 ">
                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user/profile"}`}
                  className="btn btn-primary head-btn">
                  {auth?.user?.role === 1 ? "Admin Dashboard" : "User Dashboard"}
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="btn btn-primary head-btn"
                >
                  Logout
                </NavLink>
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="btn btn-primary head-btn"><FontAwesomeIcon icon={faCartArrowDown} /></NavLink>
                </Badge>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Second part of the header with navigation bar */}
      <ul className="nav justify-content-center sec-nav">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/all-products">All Product</NavLink>
        </li>
        {categories?.map((c) => (
          <li className='nav-item'>
            <NavLink
              className="nav-link"
              to={`/category/${c.slug}`}
            >
              {c.name}
            </NavLink>
          </li>
        ))}
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link" >Contact</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
