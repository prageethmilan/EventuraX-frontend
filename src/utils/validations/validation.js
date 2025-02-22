import {normalVendorLoginErrors} from "./error";
import {toast} from "react-toastify";
import {passwordWarningMsg} from "../../const/storageStrings";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*])(?=\S+$).{8,}/

export const normalLoginVendorValidation = (email, password) => {
    const error = {...normalVendorLoginErrors}
    let passwordWarning = false

    if (email.trim() === "" || !EMAIL_REGEX.test(email)) {
        error.email = true
    }

    if (password.trim() === "") {
        error.password = true
    }

    if (!PASSWORD_REGEX.test(password)) {
        passwordWarning = true
    }

    if (passwordWarning) toast.warning(passwordWarningMsg, {
        icon: true,
        hideProgressBar: true
    })

    return error
}