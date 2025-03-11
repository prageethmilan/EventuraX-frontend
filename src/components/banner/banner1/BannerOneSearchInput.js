import React, {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import Select from "react-select";
import {categories, locations} from "../../../const/dropdownData";
import {Input} from "reactstrap";
import * as advertisementApi from "../../../utils/api/advertisement";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

function BannerOneSearchInput() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(null)
    const [location, setLocation] = useState(null)
    const [category, setCategory] = useState(null)

    const handleSearch = async () => {
        const res = await advertisementApi.getFilteredAdvertisements(1, 5, keyword, location, category);
        if (res?.advertisements?.length !== 0) {
            navigate('/listings', {
                state: {
                    data: res,
                    keyword,
                    location,
                    category,
                    page: res.currentPage,
                    size: res.totalPages,
                    totalElements: res.totalElements
                }
            })
        } else {
            toast.warning("No Advertisements Found!", {icons: true, hideProgressBar: true})
        }
    }

    return (
        <>
            <div className="main-search-input">

                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                            <span className="form-icon">
                                <FiSearch/>
                            </span>
                                <Input className="form-control" type="text"
                                       placeholder="What are you looking for?" value={keyword}
                                       onChange={(e) => setKeyword(e.target.value.trim())}/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="main-search-input-item location">
                    <Select
                        placeholder="Select a Location"
                        options={locations}
                        value={location}
                        onChange={(e) => setLocation(e)}
                    />
                </div>

                <div className="main-search-input-item category">
                    <Select
                        placeholder="Select a Category"
                        options={categories}
                        value={category}
                        onChange={(e) => setCategory(e)}
                    />
                </div>

                <div className="main-search-input-btn">
                    <button className="button theme-btn" type="submit" onClick={handleSearch}>Search</button>
                </div>

            </div>
        </>
    )
}

export default BannerOneSearchInput