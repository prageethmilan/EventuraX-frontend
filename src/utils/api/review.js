import * as reviewService from '../../services/reviewService';
import {toast} from "react-toastify";

export const addReview = async (data) => {
    let result = null
    await reviewService.addReview(data)
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

export const getAllReviewsForVendor = async (vendorId) => {
    let result = []
    await reviewService.getAllReviewsForVendor(vendorId)
        .then(async res => {
            if (res.success) {
                result = res.data
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}