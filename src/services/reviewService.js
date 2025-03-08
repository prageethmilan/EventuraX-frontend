import {apiRequest} from "./APIHandler";

export const addReview = async (data) => {
    return await apiRequest('POST', '/vendor/add-review', data);
}

export const getAllReviewsForVendor = async (vendorId) => {
    return await apiRequest('GET', `/vendor/reviews/${vendorId}`);
}