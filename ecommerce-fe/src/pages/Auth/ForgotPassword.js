import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';
import '../../styles/Header.css'


const ForgotPasssword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
                email,
                newPassword,
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
        <Layout title={"Forgot Password - Johnson Fashion Store"}>
            <div className="container" style={{ height: 410 }}>
                <div className="row d-flex justify-content-center mt-5 mb-5">
                    <div className="col-md-4">
                        <h1 className="text-center">Reset Password</h1>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input placeholder="Enter your email" className="form-control" type="text" id="email" name="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email">Enter Your favorite Sport Name :</label>
                                <input placeholder="Enter your answer" className="form-control" type="text" id="answer" name="answer" value={answer}
                                    onChange={(e) => setAnswer(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password">New Password:</label>
                                <input placeholder="Enter your password" className="form-control" type="newpassword" id="newpassword" name="newpassword" value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div>
                                <button className="btn btn-primary w-100 mt-3 head-btn" type="submit">Reset</button>
                            </div>
                            
                        </form>
                    </div>
                </div>{/* row ends here */}
            </div>{/* Container ends here */}

        </Layout>
    );
};

export default ForgotPasssword;