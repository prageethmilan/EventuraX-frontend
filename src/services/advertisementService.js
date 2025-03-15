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

export const getAdvertisementDetails = async (advertisementId) => {
    return await apiRequest('GET', `/advertisement/${advertisementId}`);
}

export const getRecommendedAdvertisements = async (location, category) => {
    const queryParams = new URLSearchParams();

    if (location?.value) {
        queryParams.append('location', location.value);
    }
    if (category?.value) {
        queryParams.append('category', category.value);
    }

    const queryString = queryParams.toString();
    const url = `/advertisement/recommended-ads${queryString ? `?${queryString}` : ''}`;

    return await apiRequest('GET', url);
}