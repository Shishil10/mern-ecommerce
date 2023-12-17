import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import ContactImg from '../img/contact.webp';
import axios from "axios";
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout title={"Contact us"}>
      <div className="container">
        <h1 className="text-center fw-bold mt-3 mb-3">Contact</h1>
        <div className="row row-gap-5 mb-4">
          <div className="col-md-6  d-flex justify-content-center">
            <img style={{ width: 500 }} className="img-thumbnail" src={ContactImg} alt="Contact" />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email1" className="form-label">Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email1"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your E-mail"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your message"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>{/* row ends here */}
      </div> {/* container ends here */}
    </Layout>
  );
};

export default Contact;
