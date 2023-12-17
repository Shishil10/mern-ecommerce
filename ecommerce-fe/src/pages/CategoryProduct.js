import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";
import { API_BASE_URL } from '../config';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${API_BASE_URL}/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Layout>
            <div className="container mt-3 category">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found </h6>

                <div className="row row-gap-3">
                    {products?.map((p) => (
                        <div key={p._id} className="col-lg-3 col-md-6 col-sm-12">
                            <div className="card product-card">
                                <img
                                    onClick={() => navigate(`/product/${p.slug}`)} style={{ height: 300, cursor: "pointer" }}
                                    src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <div className="cart-title">
                                        <h4 className="card-title">{p.name}</h4>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button
                                            className="btn btn-info ms-1 head-btn"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </Layout>
    );
};

export default CategoryProduct;