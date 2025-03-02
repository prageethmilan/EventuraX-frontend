import {normalVendorLoginErrors, normalVendorSignUpErrors, updatePasswordErrors} from "./error";
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

    if (formData.firstName.trim() === "") error.firstName = true
    if (formData.lastName.trim() === "") error.lastName = true
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