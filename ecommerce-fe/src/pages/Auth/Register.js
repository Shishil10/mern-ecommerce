import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import '../../styles/Header.css'


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Register - Johnson Fashion Store">
            <div className="container" style={{ height: 610 }}>
                <div className="row d-flex justify-content-center mt-5 mb-5">
                    <div className="col-md-4">
                        <h1 className="text-center">REGISTER</h1>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    autoFocus />
                            </div>
                            <div>
                                <label htmlFor="name">Email:</label>
                                <input 
                                     type="email"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                     className="form-control"
                                     id="email"
                                     placeholder="Enter Your Email " />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input placeholder="Enter your password" className="form-control" type="password" id="password" name="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">Phone:</label>
                                <input placeholder="Enter your Phone No." className="form-control" type="text" id="phone" name="phone" value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">Address:</label>
                                <input placeholder="Enter your address" className="form-control" type="text" id="address" name="address" value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">What is Your Favorite sports:</label>
                                <input placeholder="Enter your answer" className="form-control" type="text" id="address" name="answer" value={answer}
                                    onChange={(e) => setAnswer(e.target.value)} />
                            </div>
                            <div>
                                <button className="btn btn-primary w-100 mt-3 head-btn" type="submit">Register</button>
                            </div>

                            <div className='mt-5'>
      
                                    <span className='text-muted fs-6'>Already have an account ?</span>
                                    <Link to="/login" className='ms-1 text-dark fw-bold'>SignIn Here</Link>
                                
                            </div>
                            
                        </form>
                    </div>
                </div>{/* row ends here */}
            </div>{/* Container ends here */}

        </Layout>
    );
};

export default Register;