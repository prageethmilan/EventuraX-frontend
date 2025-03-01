import axios from "./axios";

export const signupVendor = async (data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post('/vendor/sign-up', data)
            .then(res => {
                return resolve(res)
            })
            .catch(error => {
                return resolve(error)
            })
    });
    return await promise;
}