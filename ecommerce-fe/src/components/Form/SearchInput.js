import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${API_BASE_URL}/api/v1/product/search/${values.keyword}`
            );
            setValues({
        keyword: "",
        results: data  
      });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            

            <form className="d-flex justify-content-lg-center" role="search" onSubmit={handleSubmit}>
                <input value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                    style={{ borderBottomLeftRadius: '15px', width: '75%' }}
                    className="form-control" type="search"
                    placeholder="Search" aria-label="Search"
                />
                <button className="btn btn-primary search-btn" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchInput;