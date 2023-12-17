import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import { useAuth } from "../../context/Auth";
import '../../styles/Header.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    return (
        <Layout title="Login - Johnson Fashion Store">
            <div className="container" style={{ height: 410 }}>
                <div className="row d-flex justify-content-center mt-5 mb-5">
                    <div className="col-md-4">
                        <h1 className="text-center">Login</h1>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input placeholder="Enter your email" className="form-control" type="text" id="email" name="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input placeholder="Enter your password" className="form-control" type="password" id="password" name="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button className="btn btn-primary w-100 mt-3 head-btn" type="submit">Login</button>
                            </div>
                            <div>
                                <button className="btn btn-primary w-100 mt-3 head-btn" type="submit" onClick={() => {
                                    navigate("/forgot-password");
                                }}>Forgot Password</button>
                            </div>
                            <div className='mt-5'>

                                <span className='text-muted fs-6'>Don't have an account ?</span>
                                <Link to="/register" className='ms-1 text-dark fw-bold'>Sign Up Here</Link>

                            </div>
                        </form>
                    </div>
                </div>{/* row ends here */}
            </div>{/* Container ends here */}

        </Layout>
    );
};

export default Login;