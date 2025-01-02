import React, { useState } from 'react';

function WidgetFilterCategory({catitems, title}) {
    const [isOpenCat, setIsOpenCat] = useState(false)
    return (
        <>
            <div className="sidebar-widget">
                <h3 className="widget-title">
                    {title}
                </h3>
                <div className="title-shape"></div>
                <div className={isOpenCat ? 'check-box-list show-more-item filter-by-category mt-4 mb-4 full-height-of-cat' : 'check-box-list show-more-item filter-by-category mt-4 mb-4'}>

                    {catitems.map(item => {
                        return (
                            <div className="custom-checkbox" key={item.id}>
                                <input type="checkbox" className='form-check-input' id={'chb'+item.id} />
                                <label htmlFor={'chb'+item.id}>
                                    {item.cat} <span>{item.catNum}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div
                    id="showfilterbycategory"
                    onClick={() => setIsOpenCat(!isOpenCat)}
                    className="showmore-btn fw-semibold text-capitalize d-block ms-auto me-auto text-center radius-rounded p-0">
                    {
                        isOpenCat ?
                        <span className="lessmore-txt">Show Less</span>
                        :
                        <span className="showmore-txt ">Show More</span>
                    }
                </div>
            </div>
        </>
    );
}

export default WidgetFilterCategory;
