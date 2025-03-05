import React, {useState} from 'react';
import breadcrumbimg from '../../assets/images/bread-bg.jpg';
import AddPrice from "../../components/addlisting/AddPrice";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralHeader from "../../components/common/GeneralHeader";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import Footer from "../../components/common/footer/Footer";
import {useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import {VENDOR} from "../../const/const";
import {postAdvertisementValidation} from "../../utils/validations/validation";
import {showError} from "../../utils/util";
import {postAdvertisementFormErrors} from "../../utils/validations/error";
import * as advertisementApi from '../../utils/api/advertisement';

const states = {
    breadcrumbimg: breadcrumbimg
}

function AddListing() {
    const navigate = useNavigate();
    const [error, setError] = useState(postAdvertisementFormErrors)
    const [advertisementData, setAdvertisementData] = useState({
        vendorId: JSON.parse(Cookies.get(VENDOR)).id,
        title: null,
        description: null,
        category: null,
        isLimitedTimeOffer: false,
        dateRange: null,
        images: [],
        price: ''
    });

    const handleAddListing = async () => {
        const res = postAdvertisementValidation(advertisementData)
        setError(res)

        for (const key in res) {
            if (res[key]) {
                showError()
                return
            }
        }

        await onAddListing()
    }

    const onAddListing = async () => {
        const data = {
            vendorId: JSON.parse(Cookies.get(VENDOR))?.id,
            title: advertisementData.title,
            description: advertisementData.description,
            category: advertisementData.category.value,
            isLimitedTimeOffer: advertisementData.isLimitedTimeOffer,
            offerStartDate: advertisementData.isLimitedTimeOffer ? advertisementData.dateRange[0] : null,
            offerEndDate: advertisementData.isLimitedTimeOffer ? advertisementData.dateRange[1] : null,
            images: advertisementData.images,
            price: advertisementData.price
        }

        const res = await advertisementApi.postAdvertisement(data)
        if (res) {
            navigate('/listing-confirmation', {state: res})
        }
    }

    const setAdvertisementFormData = (name, data) => {
        setAdvertisementData({
            ...advertisementData,
            [name]: data
        })
    }

    return (
        <main className="add-listing">
            {/* Header */}
            <GeneralHeader/>

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Post Your Advertisement" img={states.breadcrumbimg}/>

            {/* Add Listing */}
            <section className="add-listing-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            <GeneralInfo data={advertisementData} onSetDataHandler={setAdvertisementFormData}
                                         error={error}/>

                            <PhotoUploader data={advertisementData} onSetDataHandler={setAdvertisementFormData}
                                           error={error}/>

                            <AddPrice data={advertisementData} onSetDataHandler={setAdvertisementFormData}
                                      error={error}/>

                            <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
                                <div className="billing-content p-0">
                                    <div className="btn-box mt-4">
                                        <button className="theme-btn border-0" onClick={handleAddListing}>submit
                                            listing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/*<NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />*/}

            {/* Footer */}
            <Footer/>

            <ScrollTopBtn/>

        </main>
    );
}

export default AddListing;
