import axios from "./axios";

export const loginUser = async (data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post('/login', data)
            .then(res => {
                return resolve(res)
            })
            .catch(error => {
                return resolve(error)
            })
    });
    return await promise;
}

export const socialLogin = async (data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post('/social-login', data)
            .then(res => {
                return resolve(res)
            })
            .catch(error => {
                return resolve(error)
            })
    });
    return await promise;
}