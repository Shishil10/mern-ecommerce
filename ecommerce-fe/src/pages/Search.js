import React from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { useCart } from "../context/cart";

const Search = () => {
    const navigate = useNavigate();
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className="row row-gap-3">
                        {values?.results.map((p) => (
                            <div key={p._id} className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card product-card" >
                                    <img
                                        onClick={() => navigate(`/product/${p.slug}`)} style={{ height: 300, cursor: "pointer" }}
                                        src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">{p.name}</h4>
                                        <p className="price"> $ {p.price}</p>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p><a onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}> <i className="fa fa-cart-arrow-down" aria-hidden="true" /> Add to Cart</a></p>
                                        <p><a onClick={() => navigate(`/product/${p.slug}`)}>  More Details</a></p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;