import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import sectiondata from "../../store/store";
import Tooltips from '../other/tooltips/Tooltips';
import WidgetAuthor from "./widgets/WidgetAuthor";
import WidgetBooking from "./widgets/WidgetBooking";
import WidgetCategory from "./widgets/WidgetCategory";
import WidgetFollow from "./widgets/WidgetFollow";
import WidgetOpenHours from "./widgets/WidgetOpenHours";
import WidgetSimilarListing from "./widgets/WidgetSimilarListing";
import WidgetStaticsInfo from "./widgets/WidgetStaticsInfo";
import WidgetSubscribe from "./widgets/WidgetSubscribe";
import WidgetTags from "./widgets/WidgetTags";

const state = {
    btnText: 'Verified Listing',
    btnIcon: <BsCheckCircle />
}
function ListingDetailsSidebar() {
    return (
        <>
            <div className="author-verified-badge margin-bottom-20px">
                <Tooltips id="to-3" title="Listing has been verified and belongs the business owner or manager">
                    <div className="author__verified-badge">
                        <span className="d-inline-block">{state.btnIcon}</span> {state.btnText}
                    </div>
                </Tooltips>
            </div>
            <div className="sidebar section-bg">
                <WidgetAuthor contents={sectiondata.listingDetails.sidebar.widgetAuthor} />
                <WidgetStaticsInfo staticsinfo={sectiondata.listingDetails.sidebar.widgetStaticsInfo} />
                <WidgetBooking />
                <WidgetOpenHours openhours={sectiondata.listingDetails.sidebar.widgetOpenHours} />
                <WidgetCategory wCategories={sectiondata.listingDetails.sidebar.widgetCategories} />
                <WidgetTags tagcontent={sectiondata.listingDetails.sidebar.widgetTags} />
                <WidgetSimilarListing similarcontent={sectiondata.listingDetails.sidebar.widgetSimilarListing} />
                <WidgetSubscribe />
                <WidgetFollow followconnect={sectiondata.listingDetails.sidebar.widgetFollowConnect} />
            </div>
        </>
    );
}

export default ListingDetailsSidebar;
