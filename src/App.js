import React from 'react';
import {Route, Routes} from 'react-router-dom';

// Layouts
// Pages
import UserProfile from "./components/other/account/UserProfile";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ListingConfirmation from "./pages/dashboard/ListingConfirmation";
import BookingConfirmation from "./pages/dashboard/BookingConfirmation";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from './pages/homes/Home'
import AddListing from "./pages/listings/AddListing";
import ListLeftSidebar from "./pages/listings/ListLeftSidebar";
import ListingDetails from "./pages/listings/ListingDetails";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import UpdateListing from "./pages/listings/UpdateListing";

const App = () => {

    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/listings" element={<ListLeftSidebar/>}/>
                <Route path="/listing-details" element={<ListingDetails/>}/>
                <Route path="/add-listing/new" element={<AddListing/>}/>
                <Route path="/edit-listing" element={<UpdateListing/>}/>
                <Route path="/vendor-profile" element={<UserProfile/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/listing-confirmation" element={<ListingConfirmation/>}/>
                <Route path="/payment-success" element={<BookingConfirmation/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
            {/*)}/>*/}
        </>
    );
}

export default App;