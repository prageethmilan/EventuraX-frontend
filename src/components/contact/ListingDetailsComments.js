import React from 'react';
import userProfileImg from '../../assets/images/userProfileImg.png'
import {MdStar} from "react-icons/md";

function ListingDetailsComments({commentlists}) {
    return (
        <>
            <ul className="comments-list padding-top-40px">
                <li>

                    {commentlists.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="comment">
                                    <img className="avatar__img" alt="Comment" src={userProfileImg}/>
                                    <div className="comment-body">
                                        <div className="meta-data">
                                            <span className="comment__author">
                                                {item.name}
                                            </span>
                                            <span className="comment__date">
                                                {item.date}
                                            </span>
                                            <div className="rating-rating">
                                                {
                                                    item.rating === 5 ?
                                                        <>
                                                            <span className="la la-star"><MdStar/></span>
                                                            <span className="la la-star"><MdStar/></span>
                                                            <span className="la la-star"><MdStar/></span>
                                                            <span className="la la-star"><MdStar/></span>
                                                            <span className="la la-star"><MdStar/></span>
                                                        </> : item.rating === 4 ?
                                                            <>
                                                                <span className="la la-star"><MdStar/></span>
                                                                <span className="la la-star"><MdStar/></span>
                                                                <span className="la la-star"><MdStar/></span>
                                                                <span className="la la-star"><MdStar/></span>
                                                            </> : item.rating === 3 ?
                                                                <>
                                                                    <span className="la la-star"><MdStar/></span>
                                                                    <span className="la la-star"><MdStar/></span>
                                                                    <span className="la la-star"><MdStar/></span>
                                                                </> : item.rating === 2 ?
                                                                    <>
                                                                        <span className="la la-star"><MdStar/></span>
                                                                        <span className="la la-star"><MdStar/></span>
                                                                    </> :
                                                                    <><span className="la la-star"><MdStar/></span></>
                                                }
                                            </div>
                                        </div>
                                        <p className="comment-content">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </li>
            </ul>
            {/*<div className="button-shared padding-top-40px text-center">*/}
            {/*    <Button url="#" text="Load more review" className="border-0">*/}
            {/*        <FiRefreshCw/>*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </>
    );
}

export default ListingDetailsComments;
