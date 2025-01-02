import React from 'react';
import { Link } from "react-router-dom";

function PopularCategoriesTwo({catitems, title}) {
    return (
        <>
            <ul className="tag-list">
                {
                    title ?
                    <li className="fw-semibold color-text-2">{title}</li>
                    : ''
                }
                {catitems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.url} className="radius-rounded line-height-20">
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default PopularCategoriesTwo;
