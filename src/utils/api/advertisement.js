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
                result = res.success
                toast.error(res.message, {icon: true, hideProgressBar: true})
            }
        })
        .catch(error => {
            toast.error(error.message, {icon: true, hideProgressBar: true})
        })
    return result
}