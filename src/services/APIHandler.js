import axios from "./axios";
import $ from "jquery";

export const apiRequest = async (method, url, data = null, params = {}) => {
    $(".loadingEffect").css("display", "block")

    const headers = data instanceof FormData ? {"Content-Type": "multipart/form-data"} : {};

    const promise = new Promise((resolve, reject) => {
        axios({method, url, data, params, headers})
            .then((res) => {
                $(".loadingEffect").css("display", "none")
                return resolve(res.data)
            })
            .catch((error) => {
                $(".loadingEffect").css("display", "none")
                return reject(error.response?.data || error.message)
            });
    });
    return await promise;
};
