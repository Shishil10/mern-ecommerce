import React from 'react';
import '../../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/Auth";
import useCategory from "../../hooks/useCategory";



const Footer = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const footerStyles = {
    backgroundColor: '#0f2649',
  };

  return (
    <div>
      <div className="container-fluid" style={footerStyles}>
        <div className="row text-center row-gap-3 pt-3 mt-5 f-row">
          {categories?.map((c) => (
            <div className="col-md-3">
              <h3> <NavLink
                className="nav-link"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </NavLink></h3>

            </div>
          ))}

          <div className="col-md-3">
            <h3><a href="#">Link</a></h3>
            <NavLink to="/" style={{ textDecoration: 'none' }} className="d-block">Home</NavLink>
            {!auth?.user ? (
              <>
                <NavLink to="/login" style={{ textDecoration: 'none' }} className="d-block">Login</NavLink>
                <NavLink to="/register" style={{ textDecoration: 'none' }} className="d-block">Register</NavLink>
              </>
            ) : null}

            <NavLink to="/contact" style={{ textDecoration: 'none' }} className="d-block">Contact</NavLink>
          </div>
        </div>
        <hr className="text-light" />
        <div className="row text-center text-light pb-2">
          <div className="col-md-12">Copyright Johnson Fashion Store 2023</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
