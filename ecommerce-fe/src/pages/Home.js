import React from 'react'
import HomeCover from '../components/Layout/HomeCover';
import Slider from '../components/Layout/Slider';
import Layout from '../components/Layout/Layout';



const Home = () => {
  return (
    <Layout title={"Johnson Fashion Store"}>
      <div className="container-fluid">
        <HomeCover></HomeCover>
        <Slider></Slider>
      </div>


    </Layout>
  )
}

export default Home