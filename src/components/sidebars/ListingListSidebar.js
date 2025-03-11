import React, {useEffect} from 'react';
import {BsChevronRight} from 'react-icons/bs'
import {FiSearch} from "react-icons/fi";
import Select from "react-select";
import {categories, locations} from "../../const/dropdownData";
import {MdStar} from "react-icons/md";
import {Input} from "reactstrap";

const state = {
    title: 'Filter by Ratings',
    ratings: [
        {
            active: true,
            icons: [
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
            ]
        },
        {
            active: false,
            icons: [
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
            ]
        },
        {
            active: false,
            icons: [
                <MdStar/>,
                <MdStar/>,
                <MdStar/>,
            ]
        },
        {
            active: false,
            icons: [
                <MdStar/>,
                <MdStar/>,
            ]
        },
        {
            active: false,
            icons: [
                <MdStar/>,
            ]
        }
    ]
}

function ListingListSidebar({data, onFilterChangeHandler, onApplyFilters}) {

    useEffect(() => {
        // let minDollars = 0
        // let maxDollars = 500
        //
        // let minSlider = document.querySelector('#min')
        // let maxSlider = document.querySelector('#max')
        //
        // function numberWithSpaces(number) {
        //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        // }
        //
        // function updateDollars() {
        //     let fromValue = (maxDollars - minDollars) * minSlider.value / 500 + minDollars
        //     let toValue = (maxDollars - minDollars) * maxSlider.value / 500 + minDollars
        //
        //     document.querySelector('#from').textContent = `$${numberWithSpaces(Math.floor(fromValue))}`
        //     document.querySelector('#to').textContent = `$${numberWithSpaces(Math.floor(toValue))}`
        // }
        //
        // maxSlider.addEventListener('input', () => {
        //     let minValue = parseInt(minSlider.value)
        //     let maxValue = parseInt(maxSlider.value)
        //
        //     if (maxValue < minValue) {
        //         minSlider.value = maxValue
        //
        //         if (minValue === parseInt(minSlider.min)) {
        //             maxSlider.value = 10
        //         }
        //     }
        //
        //     updateDollars()
        // })
        //
        // minSlider.addEventListener('input', () => {
        //     let minValue = parseInt(minSlider.value)
        //     let maxValue = parseInt(maxSlider.value)
        //
        //     if (minValue > maxValue) {
        //         maxSlider.value = minValue
        //
        //         if (maxValue === parseInt(maxSlider.max)) {
        //             minSlider.value = parseInt(maxSlider.max) - 10
        //         }
        //     }
        //
        //     updateDollars()
        // })
    }, []);


    return (
        <>
            <div className="sidebar">
                <div className="sidebar-widget">
                    <div className="contact-form-action">
                        <form>
                            <div className="form-group">
                            <span className="d-inline-block form-icon">
                                <FiSearch/>
                            </span>
                                <Input className="form-control" type="text" placeholder="What are you looking for?"
                                       value={data?.keyword ? data.keyword : ''}
                                       onChange={(e) => onFilterChangeHandler('keyword', e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className="sidebar-option mb-3">
                        <Select
                            placeholder="Select a Location"
                            options={locations}
                            value={data?.location ? data.location : null}
                            onChange={(e) => onFilterChangeHandler('location', e)}
                        />
                    </div>
                    <div className="sidebar-option">
                        <Select
                            placeholder="Select a Category"
                            options={categories}
                            value={data?.category ? data.category : null}
                            onChange={(e) => onFilterChangeHandler('category', e)}
                        />
                    </div>
                </div>
                <div className="sidebar-widget">
                    <h3 className="widget-title mb-3">
                        Filter by Price
                    </h3>
                    <div className="multi-range">
                        <input id="min" type="range" min="0" max="10000000" defaultValue="0" step="1"
                               value={data?.minPrice}
                               onChange={(e) => onFilterChangeHandler('minPrice', e.target.value)}/>
                        <input id="max" type="range" min="0" max="10000000" defaultValue="10000000" step="1"
                               value={data?.maxPrice}
                               onChange={(e) => onFilterChangeHandler('maxPrice', e.target.value)}/>
                    </div>
                    <div className="price-slider-amount d-flex">
                        <label htmlFor="amount" className="filter__label">
                            Price
                        </label>
                        <div className="price-wrap d-flex">
                            <div className="price text-violet">
                                <span id="from">Rs. {data?.minPrice}</span><span> - </span><span
                                id="to">Rs. {data?.maxPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sidebar-widget">
                    <h3 className="widget-title">
                        Filter by Ratings
                    </h3>
                    <div className="title-shape"></div>
                    <ul className="rating-list mt-4">

                        {state.ratings.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.icons.map((icon, i) => {
                                        return <span key={i} className="la-star">{icon}</span>
                                    })}

                                    <label className="review-label">
                                        <Input type="radio"
                                               name="review-radio"
                                               onChange={(e) => onFilterChangeHandler('maxRating', item?.icons?.length)}/>
                                        <span className="review-mark"></span>
                                    </label>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div className="sidebar-widget">
                    <div className="btn-box">
                        <button className="theme-btn w-100 text-center" onClick={onApplyFilters}>
                            <span className="d-inline-block"><BsChevronRight/></span>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListingListSidebar;
