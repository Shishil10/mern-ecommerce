import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const initialQuantities = {};
        cart.forEach((item) => {
            initialQuantities[item._id] = 1; // You can set the initial quantity as you like
        });
        setQuantities(initialQuantities);
    }, [cart]);


    const increment = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1,
        }));
    };

    const decrement = (productId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
        }));
    };

    // Calculate total amount based on quantities
    const calculateTotalAmount = () => {
        let total = 0;
        cart?.forEach((item) => {
            total += item.price * (quantities[item._id] || 0);
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth?.token]);



    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${API_BASE_URL}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    return (
        <Layout>

            <div className="container">
                <h1 className="text-center p-2 mb-1 ">
                    {`Hello ${auth?.token && auth?.user?.name}`}
                </h1>

                <div className="row row-gap-5 mb-5 mt-5">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4>Items in cart</h4>
                            </div>
                            <div className="card-body">
                                <h4 className="text-center">
                                    {cart?.length
                                        ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                        }`
                                        : " Your Cart Is Empty"}
                                </h4>
                                {cart?.map((p) => (
                                    <div className="row mt-2">
                                        {/* first column  */}

                                        <div className="col-md-4">
                                            <img src={`${API_BASE_URL}/api/v1/product/product-photo/${p._id}`} className="img-thumbnail" alt={p.name} />
                                        </div>
                                        {/* second column  */}
                                        <div className="col-md-4 text-center">
                                            <h5 className="card-title">{p.name}</h5>
                                            <h6 className="card-subtitle">$ {p.price}</h6>
                                            <a onClick={() => removeCartItem(p._id)} href="#" className="btn btn-primary mt-2"><i className="fa-solid fa-trash-can" /></a>
                                        </div>
                                        {/* third column  */}
                                        <div className="col-md-4">
                                            <div className="input-group mb-3 mt-3">
                                                <button className="input-group-text" onClick={() => decrement(p._id)}>-</button>
                                                <input
                                                    type="text"
                                                    className="form-control bg-white text-center input-qty"
                                                    id="count"
                                                    value={quantities[p._id]}
                                                    readOnly
                                                />
                                                <button className="input-group-text" onClick={() => increment(p._id)}>+</button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>{/* card body ends */}
                        </div>{/* card ends */}
                    </div>{/* first column from main container ends here */}
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        {auth?.user?.address ? (
                                            <>
                                                <div className="mb-3">
                                                    <h4>Current Address</h4>
                                                    <h5>{auth?.user?.address}</h5>
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                    >
                                                        Update Address
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="mb-3">
                                                <h2>Update shipping address in order to make payment</h2>
                                                {auth?.token ? (
                                                    <button
                                                        className="head-btn"
                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                    >
                                                        Update Address
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() =>
                                                            navigate("/login", {
                                                                state: "/cart",
                                                            })
                                                        }
                                                    >
                                                        Plase Login to checkout
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-center">Total <span><strong> {calculateTotalAmount()}</strong></span></li>
                                    <li className="list-group-item list-group-item d-flex justify-content-between align-items-center"><span><strong>Use demo card details in order to check payment :<br></br>Demo Card No. 4242-4242-4242-4242, Exp. date 12/23, CVV - 123</strong></span></li>
                                </ul>
                                {!clientToken || !cart?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>{/* Second column from main container ends here */}
                </div>{/* row ends here */}
            </div> {/* container-fluid ends here */}

        </Layout>
    );
};

export default CartPage;