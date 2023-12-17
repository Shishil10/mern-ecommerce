import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../config';

const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="container m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products List</h1>

                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((p) => (
                                        <tr key={p._id}>
                                            <td>
                                                <img
                                                    src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`}
                                                    alt={p.name}
                                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                />
                                            </td>
                                            <td>{p.name}</td>
                                            <td>{p.description.substring(0, 60)}</td>
                                            <td>
                                                <Link
                                                    to={`/dashboard/admin/product/${p.slug}`}
                                                    className="btn btn-primary"
                                                >
                                                    Update Product
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
