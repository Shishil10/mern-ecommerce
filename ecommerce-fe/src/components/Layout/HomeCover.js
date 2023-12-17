import React from 'react';
import '../../styles/Home.css'
import Logo from '../../img/logo.png';
import { NavLink } from 'react-router-dom';



const HomeCover = () => {
  const heroStyles = {
    height: '400px',
    width: '500px',
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 p-0 d-flex justify-content-center p-5 hero-img">
          <div className="text-center hero" style={heroStyles}>
            <img className="img-fluid" src={Logo} alt="" />
            <h2>Super Value Deals</h2>
            <h1 className=''>On All Products</h1>
            <NavLink to="/all-products"><button>Shop Now</button></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCover;
