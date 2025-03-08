import React from 'react';
import userProfileImg from '../../assets/images/userProfileImg.png'
import moment from "moment";
import ReactStars from "react-rating-stars-component/dist/react-stars";

function ListingDetailsComments({reviewLists}) {
    return (
        <>
            <ul className="comments-list padding-top-40px">
                <li>

                    {reviewLists.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="comment">
                                    <img className="avatar__img" alt="Comment" src={userProfileImg}/>
                                    <div className="comment-body flex-grow-1">
                                        <div className="meta-data">
                                            <span className="comment__author">
                                                {item.userName}
                                            </span>
                                            <span className="comment__date">
                                                {moment(item.createdDate).format('YYYY-MM-DD')}
                                            </span>
                                            <div className="rating-rating">
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={item.rating}
                                                    activeColor={'#ffd700'}
                                                    edit={false}
                                                />
                                            </div>
                                        </div>
                                        <p className="comment-content">
                                            {item.reviewText}
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
