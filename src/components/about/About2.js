import React from 'react';
import Button from "../common/Button";
import SectionsHeading from "../common/SectionsHeading";

function About2({aboutcontent}) {
    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="about-content">
                        <SectionsHeading
                            title={aboutcontent.title}
                            desc={aboutcontent.content1}
                            descClass=" font-size-17 pe-3 mb-3"
                        >
                            <p className="sec__desc font-size-17 pe-3">
                                {aboutcontent.content2}
                            </p>
                            <div className="btn-box padding-top-30px">
                                <Button text="find out more" url="#" />
                            </div>
                        </SectionsHeading>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="img-boxes">
                        <div className="row">
                            {aboutcontent.items.map((item, i) => {
                                return (
                                    <div className="col-lg-6 column-td-6" key={i}>
                                        <div className={'img-box-item ' + item.boxClass}>
                                            <img src={item.img} alt="about" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About2;
