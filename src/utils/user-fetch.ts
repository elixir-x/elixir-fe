import http, { handleResponse } from "../../http-common";

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const response = await handleResponse(http.get(`/check-username?username=${username}`));
        return response.code === 200;
    } catch (e) {
        return false;
    }
};
