import http from "../../http-common";
import { RouterLink } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { string } from "zod";

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const response = await http.get(`/check-username?username=${username}`);
        return response.status === 200;
    } catch (e) {
        return false;
    }
};
