import React, { useEffect, useState } from 'react';

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
                            &copy; Copyright By EventuraX {year}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Copyright;
