import http from "../../http-common";
import { ValidationError } from "yup";

export const checkUsername = async (username: string): Promise<boolean | ValidationError> => {
    try {
        const response = await http.get(`/check-username?username=${username}`)
        return response.status === 200;
    } catch (e) { return false }
};
