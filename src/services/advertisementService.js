import {apiRequest} from "./APIHandler";

export const postAdvertisement = async (formData) => {
    try {
        return await apiRequest('POST', '/advertisement/add', formData)
    } catch (error) {
        throw error
    }
}

export const getAllAds = async (vendorId, paymentStatus, page, size) => {
    return await apiRequest('GET', `/advertisement/getAllAds/${vendorId}${page ? `?page=${page}` : ''}${size ? `&limit=${size}` : ''}${paymentStatus ? `&paymentStatus=${paymentStatus}` : ''}`)
}