import React, { useState, useEffect } from 'react';
import '../../styles/Home.css';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [chunkSize, setChunkSize] = useState(calculateChunkSize());

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/product/featured-products`);
                const { success, products } = response.data;

                if (success) {
                    setFeaturedProducts(products);
                } else {
                    console.error('Failed to fetch featured products');
                }
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };

        const handleResize = () => {
            setChunkSize(calculateChunkSize());
        };

        window.addEventListener('resize', handleResize);

        fetchFeaturedProducts();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 

    function calculateChunkSize() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1200) {
            return 4; // Large screens
        } else if (screenWidth >= 992) {
            return 3; // Tablets
        } else if (screenWidth >= 768) {
            return 2; // Medium screens (small tablets and large phones)
        } else {
            return 1; // Small screens (mobile)
        }
    }

    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    };

    const chunkedProducts = chunkArray(featuredProducts, chunkSize);

    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <h1 className="text-center fw-bold mt-3 mb-3">Featured Products</h1>

                    {chunkedProducts.map((slide, slideIndex) => (
                        <div key={slideIndex} className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}>
                            <div className="row">
                                {slide.map((product, index) => (
                                    <div key={index} className={`col-lg-${12 / chunkSize} col-md-6 col-sm-6 col-12`}>
                                        <div className="card product-card">
                                            <img
                                                onClick={() => navigate(`/product/${product.slug}`)}
                                                style={{ height: 300, cursor: "pointer" }}
                                                src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                                                className="card-img-top"
                                                alt={product.name}
                                            />
                                            <div className="card-body">
                                                <h4 className="card-title">{product.name}</h4>
                                                <p className="price">{product.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                                </p>
                                                <p>{product.description.substring(0, 60)}...</p>
                                                <p>
                                                    <a onClick={() => {
                                                        setCart([...cart, product]);
                                                        localStorage.setItem(
                                                            "cart",
                                                            JSON.stringify([...cart, product])
                                                        );
                                                        toast.success("Item Added to cart");
                                                    }}>
                                                        <i className="fa fa-cart-arrow-down" aria-hidden="true" /> Add to Cart
                                                    </a>
                                                </p>
                                                <p>
                                                    <a onClick={() => navigate(`/product/${product.slug}`)}>More Details</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Slider;
