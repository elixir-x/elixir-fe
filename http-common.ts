import axios, { AxiosError, AxiosResponse } from "axios";

export const handleResponse = async (res: Promise<AxiosResponse>): Promise<{ res: AxiosResponse | undefined, data: any, code: number, error: any }> => {
    try {
        const response = await res;
        return { res: response, data: response.data.data, code: response.status, error: response.data.error }
    } catch (e) {
        const { response, message } = e as AxiosError;
        return { res: response, data: null, code: 0, error: message }
    }
};

export default axios.create({
    baseURL: import.meta.env.ELIXIR_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    },
    validateStatus: () => true
});
