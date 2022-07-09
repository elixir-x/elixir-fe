import axios, { AxiosResponse } from "axios";

export const handleResponse = async (res: Promise<AxiosResponse>): Promise<{ res: AxiosResponse, data: any, code: number, success: boolean, message: string }> => {
    const response = await res;
    return { res: response, data: response.data.data, code: response.status, success: response.data.success, message: response.data.message }
};

export default axios.create({
    baseURL: import.meta.env.ELIXIR_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    },
    validateStatus: () => true
});
