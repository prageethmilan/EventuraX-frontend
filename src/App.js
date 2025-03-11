import React, {useRef} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

// Layouts
// Pages
import UserProfile from "./components/other/account/UserProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Faq from "./pages/FAQ";
import Login from "./pages/Login";
import PricingPlan from "./pages/PricingPlan";
import RecoverPassword from "./pages/RecoverPassword";
import SignUp from "./pages/SignUp";
import TopAuthors from "./pages/TopAuthors";
import BlogDetail from "./pages/blogs/BlogDetail";
import BlogFullWidth from "./pages/blogs/BlogFullWidth";
import BlogGrid from "./pages/blogs/BlogGrid";
import BlogLeftSidebar from "./pages/blogs/BlogLeftSidebar";
import BlogRightSidebar from "./pages/blogs/BlogRightSidebar";
import AllCategories from './pages/categories/AllCategories';
import AllLocations from './pages/categories/AllLocations';
import TopPlaces from "./pages/categories/TopPlaces";
import ListingConfirmation from "./pages/dashboard/ListingConfirmation";
import BookingConfirmation from "./pages/dashboard/BookingConfirmation";
import Dashboard from "./pages/dashboard/Dashboard";
import Invoice from "./pages/dashboard/Invoice";
import Home2 from './pages/homes/Home2'
import AddListing from "./pages/listings/AddListing";
import ListLeftSidebar from "./pages/listings/ListLeftSidebar";
import ListMapView from "./pages/listings/ListMapView";
import ListMapView2 from "./pages/listings/ListMapView2";
import ListRightSidebar from "./pages/listings/ListRightSidebar";
import ListingDetails from "./pages/listings/ListingDetails";
import ListingGrid from "./pages/listings/ListingGrid";
import ListingList from "./pages/listings/ListingList";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import UpdateListing from "./pages/listings/UpdateListing";

const App = () => {

    const childRef = useRef();
    let location = useLocation();

    // useEffect(() => {
    //     document.body.classList.add('is-loaded')
    //     childRef.current.init();
    // }, [location]);

    return (
        // <BrowserRouter></BrowserRouter>
        <>
            {/*<ScrollReveal*/}
            {/*    ref={childRef}*/}
            {/*    children={() => (*/}
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home2/>}/>
                <Route path="/all-categories" element={<AllCategories/>}/>
                <Route path="/all-locations" element={<AllLocations/>}/>
                <Route path="/top-place" element={<TopPlaces/>}/>
                <Route path="/listing-grid" element={<ListingGrid/>}/>
                <Route path="/listing-list" element={<ListingList/>}/>
                <Route path="/list-map-view" element={<ListMapView/>}/>
                <Route path="/list-map-view2" element={<ListMapView2/>}/>
                <Route path="/listings" element={<ListLeftSidebar/>}/>
                <Route path="/list-right-sidebar" element={<ListRightSidebar/>}/>
                <Route path="/listing-details" element={<ListingDetails/>}/>
                <Route path="/add-listing/new" element={<AddListing/>}/>
                <Route path="/edit-listing" element={<UpdateListing/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
                <Route path="/top-author" element={<TopAuthors/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/listing-confirmation" element={<ListingConfirmation/>}/>
                <Route path="/payment-success" element={<BookingConfirmation/>}/>
                <Route path="/invoice" element={<Invoice/>}/>
                <Route path="/pricing" element={<PricingPlan/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/recover" element={<RecoverPassword/>}/>
                <Route path="/blog-full-width" element={<BlogFullWidth/>}/>
                <Route path="/blog-grid" element={<BlogGrid/>}/>
                <Route path="/blog-left-sidebar" element={<BlogLeftSidebar/>}/>
                <Route path="/blog-right-sidebar" element={<BlogRightSidebar/>}/>
                <Route path="/blog-single" element={<BlogDetail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
            {/*)}/>*/}
        </>
    );
}

export default App;