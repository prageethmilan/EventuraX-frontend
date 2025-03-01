import * as authService from '../../services/authService'
import {ACCESS_TOKEN, VENDOR} from "../../const/const";
import Cookies from 'js-cookie'
import {toast} from "react-toastify";

export const loginUser = async (data) => {
    let result = null
    await authService.loginUser(data)
        .then(async res => {
            if (res.success) {
                if (res.access_token) {
                    result = await setCookies(res.access_token, res.vendor)
                    toast.success(res.message, {icon: true, hideProgressBar: true})
                }
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
    return result
}

export const socialLogin = async (data) => {
    let result = null
    await authService.socialLogin(data)
        .then(async res => {
            if (res.success) {
                result = await setCookies(res.access_token, res.vendor)
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
    return result
}

const setCookies = (access_token, vendor) => {
    let result = null
    if (access_token) {
        Cookies.set(ACCESS_TOKEN, access_token)
        Cookies.set(VENDOR, JSON.stringify(vendor))
    }
    result = {status: true}
    return result
}