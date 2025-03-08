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

export const getAllAdsForDashboard = async (vendorId) => {
    return await apiRequest('GET', `/advertisement/getAllAdsForDashboard/${vendorId}`);
}

export const updateAdvertisement = async (advertisementId, formData) => {
    try {
        return await apiRequest('PUT', `/advertisement/update/${advertisementId}`, formData)
    } catch (error) {
        throw error
    }
}

export const deleteAdvertisement = async (advertisementId) => {
    return await apiRequest('DELETE', `/advertisement/${advertisementId}`);
}