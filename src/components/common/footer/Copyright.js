import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import sectiondata from "../../../store/store";
import CopyrightMenu from "./CopyrightMenu";

function Copyright() {
  const [year, setYear] = useState();
  
  useEffect(() => {
    setYear(new Date().getFullYear())
  },[]);
   
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="copy-right margin-top-50px padding-top-60px">
                        <p className="copy__desc">
                            &copy; Copyright Dirto {year} Made with<span className="la"><FiHeart /></span> by <a href="https://themeforest.net/user/techydevs/portfolio">TechyDevs</a>
                        </p>

                        <CopyrightMenu copyrightright={sectiondata.footerdata.copyright} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Copyright;
