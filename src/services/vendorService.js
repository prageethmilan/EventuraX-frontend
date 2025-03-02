import {apiRequest} from "./APIHandler";

export const signupVendor = async (data) => {
    return await apiRequest('POST', "/vendor/sign-up", data);
}

export const updatePassword = async (data) => {
    return await apiRequest('POST', "/vendor/update-password", data);
}

export const getVendorDetails = async (vendorId) => {
    return await apiRequest('GET', `/vendor/${vendorId}`)
}

export const updateVendor = async (vendorId, data) => {
    return await apiRequest('PUT', `/vendor/${vendorId}`, data)
}

export const updateVendorLogo = async (vendorId, logo) => {
    const formData = new FormData();
    formData.append('logo', logo);
    try {
        return await apiRequest('PUT', `/vendor/${vendorId}/upload-logo`, formData)
    } catch (error) {
        throw error;
    }
}