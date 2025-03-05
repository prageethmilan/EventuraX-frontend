import {apiRequest} from "./APIHandler";

export const paymentHandleForAdvertisement = async (data) => {
    return await apiRequest('POST', '/advertisement/payment', data);
}

export const verifyPayment = async (sessionId) => {
    return await apiRequest('PUT', '/advertisement/payment/verify', {sessionId});
}