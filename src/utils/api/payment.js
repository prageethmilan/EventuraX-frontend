import * as paymentService from '../../services/paymentService';
import {toast} from "react-toastify";

export const paymentHandleForAdvertisement = async (data) => {
    let result = null
    await paymentService.paymentHandleForAdvertisement(data)
        .then(async res => {
            if (res.success) {
                result = res.data
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                result = res.success
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const verifyPayment = async (sessionId) => {
    let result = null
    await paymentService.verifyPayment(sessionId)
        .then(async res => {
            if (res.success) {
                result = res.success
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                result = res.success
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}