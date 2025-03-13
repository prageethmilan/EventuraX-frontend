import React, {useState} from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import {BsListCheck, BsPower} from 'react-icons/bs';
import {FiPlus, FiPlusCircle} from 'react-icons/fi';
import {Link, useNavigate} from "react-router-dom";
import userimg from '../../../assets/images/userProfileImg.png';
// import Button from "../../common/Button";
import Tooltips from '../tooltips/Tooltips';
import Cookies from "js-cookie";
import {ACCESS_TOKEN, VENDOR} from "../../../const/const";
import {Button} from "reactstrap";
import {toast} from "react-toastify";
import {accountNotVerifiedWarningMsg} from "../../../const/storageStrings";

export default function HeaderAuthorAccess() {
    const navigate = useNavigate();
    const [AuthorAccessOpen, setAuthorAccessOpen] = useState(false)
    let vendor;

    try {
        const vendorCookie = Cookies.get(VENDOR);
        if (vendorCookie !== undefined) {
            vendor = JSON.parse(vendorCookie);
        } else {
            console.warn('VENDOR cookie is undefined or missing.');
            vendor = null;
        }
    } catch (error) {
        console.error('Failed to parse VENDOR cookie:', error);
        vendor = null;
    }

    const handleAddListing = () => {
        if (Cookies.get(ACCESS_TOKEN) !== undefined) {
            if (JSON.parse(Cookies.get(VENDOR)).isVerified) {
                navigate('/add-listing/new')
            } else {
                toast.warning(accountNotVerifiedWarningMsg, {icon: true, hideProgressBar: true})
            }
        } else {
            navigate('/login')
        }
    }

    const signOutHandler = () => {
        Cookies.remove(ACCESS_TOKEN)
        Cookies.remove(VENDOR)
        navigate('/login')
    }

    return (
        <>
            <div className="logo-right-content">
                <ul className="author-access-list">
                    {Cookies.get(ACCESS_TOKEN) === undefined && <li>
                        <Link to="/login">login</Link>
                        <span className="or-text">or</span>
                        <Link to="/sign-up">Sign up</Link>
                    </li>}
                    <li>
                        <Button color={'danger'} className={'d-flex align-items-center p-2'} onClick={handleAddListing}>
                            <FiPlusCircle className={'me-1'}/>
                            <span className="btn-text">Post Your Ad</span>
                        </Button>
                    </li>
                </ul>
                {Cookies.get(ACCESS_TOKEN) !== undefined &&
                    <div className="side-user-menu-open" onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}>
                        <AiOutlineUser/>
                    </div>}
            </div>

            {/* Side User panel */}
            <div className={AuthorAccessOpen ? 'side-user-panel active' : 'side-user-panel'}>
                <div className="humburger-menu">
                    <div className="humburger-menu-lines side-menu-close"
                         onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}></div>
                </div>
                <div className="side-menu-wrap side-user-menu-wrap">

                    <div className="side-user-img">
                        <img src={vendor?.logo ? vendor?.logo : userimg} alt="User"/>
                        <h4 className="su__name">{vendor?.name}</h4>
                        <div className="avatar-icon">
                            <Tooltips id="t-3" title="Change Avatar">
                                <Link to="/dashboard"> <FiPlus/></Link>
                            </Tooltips>

                        </div>
                    </div>

                    <ul className="side-menu-ul">
                        <li><Link to="/dashboard"><AiOutlineUser className="user-icon"/> My Profile</Link></li>
                        <li><Link to="/dashboard"><BsListCheck className="user-icon"/> My Listings</Link></li>
                        <li><a href={''} onClick={handleAddListing}><FiPlusCircle className="user-icon"/> add
                            listing</a></li>
                        <li>
                            <div className="dropdown-divider"></div>
                        </li>
                        <li><a href={''} onClick={signOutHandler}><BsPower className="user-icon"/> Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
