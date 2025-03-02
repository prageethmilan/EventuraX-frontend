import {toast} from "react-toastify";

export const showError = () => {
    toast.error('Please fill the all required fields correctly!', {icon: true, hideProgressBar: true})
}

export const findObject = (array, value, property) => {
    return array.find(obj => {
        return property ? obj[property] === value : obj.value === value
    })
}