import axios from "./axios";
import $ from "jquery";

export const apiRequest = async (method, url, data = null, params = {}) => {
    $(".loadingEffect").css("display", "block")
    const promise = new Promise((resolve, reject) => {
        axios({method, url, data, params})
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
