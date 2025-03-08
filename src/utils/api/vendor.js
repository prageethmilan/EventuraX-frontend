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

export const updatePassword = async (data) => {
    let result = null
    await vendorService.updatePassword(data)
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

export const getVendorDetails = async (vendorId) => {
    let result = null
    await vendorService.getVendorDetails(vendorId)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const updateVendor = async (vendorId, data) => {
    let result = null
    await vendorService.updateVendor(vendorId, data)
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

export const updateVendorLogo = async (vendorId, logo) => {
    let result = null
    await vendorService.updateVendorLogo(vendorId, logo)
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

export const getVendorDetailsForUserProfile = async (vendorId) => {
    let result = null
    await vendorService.getVendorDetailsForUserProfile(vendorId)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}