import * as authService from '../../services/authService'
import {ACCESS_TOKEN, VENDOR} from "../../const/const";
import Cookies from 'js-cookie'
import {toast} from "react-toastify";

export const loginUser = async (data) => {
    let result = null
    await authService.loginUser(data)
        .then(async res => {
            if (res.status === 200) {
                if (res.data) {
                    result = await setCookies(res.data)
                    toast.success(res.data.message, {icon: true, hideProgressBar: true})
                }
            } else if (res.status === 400) {
                toast.error(res.response.data.message, {icon: true, hideProgressBar: true})
            }
        })
    return result
}

export const socialLogin = async (data) => {
    let result = null
    await authService.socialLogin(data)
        .then(async res => {
            if (res.status === 200) {
                result = await setCookies(res.data)
                toast.success(res.data.message, {icon: true, hideProgressBar: true})
            } else if (res.status === 400) {
                toast.error(res.response.data.message, {icon: true, hideProgressBar: true})
            }
        })
    return result
}

const setCookies = (res) => {
    let result = null
    if (res) {
        Cookies.set(ACCESS_TOKEN, res.access_token)
        Cookies.set(VENDOR, JSON.stringify(res.vendor))
    }
    result = {...res, status: true}
    return result
}