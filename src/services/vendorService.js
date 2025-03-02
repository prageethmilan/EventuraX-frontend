import {apiRequest} from "./APIHandler";

export const signupVendor = async (data) => {
    return await apiRequest('POST', "/vendor/sign-up", data);
}

export const updatePassword = async (data) => {
    return await apiRequest('POST', "/vendor/update-password", data);
}