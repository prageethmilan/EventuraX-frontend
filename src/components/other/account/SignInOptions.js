import React from 'react';
import {FaFacebookF, FaGoogle} from 'react-icons/fa'
import {FaXTwitter} from 'react-icons/fa6'
import {auth, facebookProvider, googleProvider, signInWithPopup, twitterProvider} from '../../../configs/firebaseConfig'
import * as loginApi from '../../../utils/api/login'

function SignInOptions() {

    const handleGoogleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const res = await loginApi.socialLogin({
                email: user.email,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                googleId: provider.providerId,
                socialId: user.uid
            });

            if (res && res?.status) {
                window.open('/', '_self')
            }
        } catch (error) {
            console.error('Social Login Failed:', error);
        }
    };

    const handleFacebookLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const res = await loginApi.socialLogin({
                email: user.email,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                facebookId: provider.providerId,
                socialId: user.uid
            });

            if (res && res?.status) {
                window.open('/', '_self')
            }
        } catch (error) {
            console.error('Social Login Failed:', error);
        }
    };

    const handleTwitterLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const res = await loginApi.socialLogin({
                email: user.email,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1] || '',
                twitterId: provider.providerId,
                socialId: user.uid
            });

            if (res && res?.status) {
                window.open('/', '_self')
            }
        } catch (error) {
            console.error('Social Login Failed:', error);
        }
    };


    return (
        <>
            <div className="col-lg-4">
                <button className="theme-btn border-0 w-100" onClick={() => handleGoogleLogin(googleProvider)}>
                    <i><FaGoogle/></i> Google
                </button>
            </div>
            <div className="col-lg-4">
                <button className="theme-btn bg-5 border-0 w-100" onClick={() => handleFacebookLogin(facebookProvider)}>
                    <i><FaFacebookF/></i> facebook
                </button>
            </div>
            <div className="col-lg-4">
                <button className="theme-btn bg-black border-0 w-100"
                        onClick={() => handleTwitterLogin(twitterProvider)}>
                    <i><FaXTwitter/></i> X
                </button>
            </div>
        </>
    );
}

export default SignInOptions;
