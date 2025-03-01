import * as vendorService from "../../services/vendorService";
import {toast} from "react-toastify";

export const signupVendor = async (data) => {
    let result = null
    await vendorService.signupVendor(data)
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