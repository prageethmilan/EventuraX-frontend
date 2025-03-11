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

export const getFilteredAdvertisements = async (page, limit, keyword, location, category, minPrice, maxPrice, maxRating, sortByPrice) => {
    return await apiRequest('GET', `/advertisement/filter?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}${location ? `&location=${location.value}` : ''}${category ? `&category=${category.value}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}${maxRating ? `&maxRating=${maxRating}` : ''}${sortByPrice ? `&sortByPrice=${sortByPrice?.value}` : ''}`)
}