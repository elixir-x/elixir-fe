import http from "../../http-common";

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const response = await http.get(`/check-username?username=${username}`);
        return response.status === 200;
    } catch (e) {
        return false;
    }
};
