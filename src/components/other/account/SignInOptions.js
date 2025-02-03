import React from 'react';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'
import {auth, googleProvider, facebookProvider, signInWithPopup} from '../../../configs/firebaseConfig'
import axios from 'axios';

function SignInOptions() {

    const handleGoogleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const res = await axios.post('http://localhost:5000/api/v1/auth/social-login', {
                email: user.email,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                googleId: provider.providerId,
            });

            localStorage.setItem('token', res.data.access_token);
            console.log('Login Successful:', res.data);
        } catch (error) {
            console.error('Social Login Failed:', error);
        }
    };


    return (
        <>
            <div className="col-lg-4">
                    <button className="theme-btn border-0 w-100" onClick={() => handleGoogleLogin(googleProvider)}>
                        <i><FaGoogle /></i> Google
                    </button>
            </div>
            <div className="col-lg-4">
                    <button className="theme-btn bg-5 border-0 w-100">
                        <i><FaFacebookF /></i> facebook
                    </button>
            </div>
            <div className="col-lg-4">
                    <button className="theme-btn bg-6 border-0 w-100">
                        <i><FaTwitter /></i> twitter
                    </button>
            </div>
        </>
    );
}

export default SignInOptions;
