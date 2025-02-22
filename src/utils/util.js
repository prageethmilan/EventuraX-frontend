import {toast} from "react-toastify";

export const showError = () => {
    toast.error('Please fill the all required fields correctly!', {icon: true, hideProgressBar: true})
}