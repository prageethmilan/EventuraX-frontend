import * as vendorService from "../../services/vendorService";
import {toast} from "react-toastify";

export const signupVendor = async (data) => {
    let result = null
    await vendorService.signupVendor(data)
        .then(async res => {
            if (res.status === 200) {
                console.log(res)
                if (res.data.success) {
                    result = res.data.success
                    toast.success(res.data.message, {icon: true, hideProgressBar: true})
                } else {
                    result = res.data.success
                    toast.error(res.data.message, {icon: true, hideProgressBar: true})
                }
            } else if (res.status === 400) {
                result = false
                toast.error(res.response.data.message, {icon: true, hideProgressBar: true})
            }
        })
    return result
}