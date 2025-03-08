import {
    normalVendorLoginErrors,
    normalVendorSignUpErrors,
    postAdvertisementFormErrors,
    reviewFormDataErrors,
    updatePasswordErrors,
    updateVendorFormErrors
} from "./error";
import {toast} from "react-toastify";
import {emailWarningMsg, passwordWarningMsg} from "../../const/storageStrings";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\S+$).{8,}/

export const normalLoginVendorValidation = (email, password) => {
    const error = {...normalVendorLoginErrors}

    if (email.trim() === "") {
        error.email = true
    }

    if (password.trim() === "") {
        error.password = true
    }

    if (!EMAIL_REGEX.test(email)) toast.warning(emailWarningMsg, {icon: true, hideProgressBar: true})

    if (!PASSWORD_REGEX.test(password)) toast.warning(passwordWarningMsg, {
        icon: true,
        hideProgressBar: true
    })

    return error
}

export const normalSignupVendorValidation = (formData) => {
    const error = {...normalVendorSignUpErrors}

    if (formData.name.trim() === "") error.name = true
    if (formData.email.trim() === "") error.email = true
    if (formData.password.trim() === "") error.password = true
    if (formData.confirmPassword.trim() === "") error.confirmPassword = true

    return error
}

export const updatePasswordValidation = (formData) => {
    const error = {...updatePasswordErrors}

    if (formData.currentPassword.trim() === "") error.currentPassword = true
    if (formData.newPassword.trim() === "") error.newPassword = true
    if (formData.confirmPassword.trim() === "") error.confirmPassword = true
    return error
}

export const updateVendorFormValidation = (formData) => {
    const error = {...updateVendorFormErrors}
    if (!formData.name || formData.name.trim() === "") error.name = true
    if (!formData.description || formData.description.trim() === "") error.description = true
    if (!formData.location) error.location = true
    if (!formData.address || formData.address.trim() === "") error.address = true
    if (!formData.mobileNumber || formData.mobileNumber.trim() === "") error.mobileNumber = true
    if (!formData.email || formData.email.trim() === "") error.email = true
    return error
}

export const postAdvertisementValidation = (formData) => {
    const error = {...postAdvertisementFormErrors}
    if (!formData.title || formData.title.trim() === "") error.title = true
    if (!formData.description || formData.description.trim() === "") error.description = true
    if (!formData.category) error.category = true
    if (formData.images.length === 0) error.photos = true
    if (!formData.price || formData.price.trim() === "") error.price = true
    if (formData.isLimitedTimeOffer && formData.dateRange === null) error.dateRange = true
    return error
}

export const reviewFormDataValidation = (formData) => {
    const error = {...reviewFormDataErrors}
    if (!formData.username || formData.username.trim() === "") error.username = true
    if (!formData.reviewText || formData.reviewText.trim() === "") error.reviewText = true
    return error
}