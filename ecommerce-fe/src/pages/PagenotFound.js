import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
    return (
        <Layout title={"go back- page not found"}>
            <div className="card align-items-center">
                <div className="card-body text-center">
                    <h1 className="card-title">404</h1>
                    <h2 className="card-heading">Oops ! Page Not Found</h2>
                    <Link to="/" className="btn btn-dark">
                        Go Back
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Pagenotfound;