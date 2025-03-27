import * as advertisementService from "../../services/advertisementService";
import {toast} from "react-toastify";

export const postAdvertisement = async (data) => {
    const formData = new FormData();

    formData.append('vendorId', data.vendorId);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append("category", data.category);
    formData.append("isLimitedTimeOffer", data.isLimitedTimeOffer);
    formData.append("offerStartDate", data.offerStartDate);
    formData.append("offerEndDate", data.offerEndDate);
    formData.append("price", data.price);

    data.images.forEach((image) => {
        formData.append("images", image);
    });

    let result = null
    await advertisementService.postAdvertisement(formData)
        .then(async res => {
            if (res.success) {
                result = res.data
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const getAllAds = async (vendorId, paymentStatus, pageNumber, size) => {
    let result = null;
    await advertisementService.getAllAds(vendorId, paymentStatus, pageNumber, size)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const getAllAdsForDashboard = async (vendorId) => {
    let result = [];
    await advertisementService.getAllAdsForDashboard(vendorId)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const updateAdvertisement = async (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append("category", data.category);
    formData.append("isLimitedTimeOffer", data.isLimitedTimeOffer);
    formData.append("offerStartDate", data.offerStartDate);
    formData.append("offerEndDate", data.offerEndDate);
    formData.append("price", data.price);

    data.images.length !== 0 && data.images.forEach((image) => {
        formData.append("images", image);
    });

    let result = null
    await advertisementService.updateAdvertisement(data.advertisementId, formData)
        .then(async res => {
            if (res.success) {
                result = res.data
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const deleteAdvertisement = async (advertisementId) => {
    let result = false
    await advertisementService.deleteAdvertisement(advertisementId)
        .then(async res => {
            if (res.success) {
                result = res.success
                toast.success(res.message, {icon: true, hideProgressBar: true})
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}

export const getFilteredAdvertisements = async (page, size, keyword, location, category, minPrice, maxPrice, maxRating) => {
    let result = null;
    await advertisementService.getFilteredAdvertisements(page, size, keyword, location, category, minPrice, maxPrice, maxRating)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result;
}

export const getAdvertisementDetails = async (advertisementId) => {
    let result = null;
    await advertisementService.getAdvertisementDetails(advertisementId)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result;
}

export const getRecommendedAdvertisements = async (location, category) => {
    let result = null;
    await advertisementService.getRecommendedAdvertisements(location, category)
        .then(async res => {
            if (res.success) {
                result = res.data
            } else {
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result;
}