import React from 'react';
import {BsCheckCircle} from 'react-icons/bs';
import Tooltips from '../other/tooltips/Tooltips';
import WidgetAuthor from "./widgets/WidgetAuthor";
import WidgetBooking from "./widgets/WidgetBooking";
import WidgetStaticsInfo from "./widgets/WidgetStaticsInfo";

const state = {
    btnText: 'Verified Advertisement',
    btnIcon: <BsCheckCircle/>
}

function ListingDetailsSidebar({data}) {
    return (
        <>
            <div className="author-verified-badge margin-bottom-20px">
                <Tooltips id="to-3" title="Advertisement has been verified and belongs the business owner or manager">
                    <div className="author__verified-badge">
                        <span className="d-inline-block">{state.btnIcon}</span> {state.btnText}
                    </div>
                </Tooltips>
            </div>
            <div className="sidebar section-bg">
                <WidgetAuthor advertisement={data}/>
                <WidgetStaticsInfo staticsinfo={data}/>
                <WidgetBooking data={data}/>
            </div>
        </>
    );
}

export default ListingDetailsSidebar;
