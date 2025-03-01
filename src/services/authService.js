import {apiRequest} from "./APIHandler";

export const loginUser = async (data) => {
    return await apiRequest('POST', '/auth/login', data);
}

export const socialLogin = async (data) => {
    return await apiRequest('POST', '/auth/social-login', data);
}