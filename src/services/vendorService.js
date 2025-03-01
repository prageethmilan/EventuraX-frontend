import axios from "./axios";
import {apiRequest} from "./APIHandler";

export const signupVendor = async (data) => {
    return await apiRequest('POST', "/vendor/sign-up", data);
}