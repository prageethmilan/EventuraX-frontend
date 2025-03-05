import {apiRequest} from "./APIHandler";

export const postAdvertisement = async (formData) => {
    try {
        return await apiRequest('POST', '/advertisement/add', formData)
    } catch (error) {
        throw error
    }
}