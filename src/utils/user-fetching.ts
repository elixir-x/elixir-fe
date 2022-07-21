import http, { handleResponse } from "../../http-common";

export const checkUsername = async (username: string): Promise<boolean> => {
    try {
        const response = await handleResponse(http.get(`/check-username?username=${username}`));
        return response.code === 200;
    } catch (e) {
        return false;
    }
};

export type UserUpdateProps = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    bio: string,
    profileUrl: string,
    profileBlob: Blob
}

export const updateUserInfo = async (props: Partial<UserUpdateProps>): Promise<boolean> => {
    try {
        const formData = new FormData();

        if (props.profileBlob)
            formData.append("profile", props.profileBlob);
        if (props.username)
            formData.append("username", props.username);
        if (props.email)
            formData.append("email", props.email);
        if (props.bio)
            formData.append("bio", props.bio);
        if (props.password)
            formData.append("password", props.password);
        if (props.confirmPassword)
            formData.append("confirmPassword", props.confirmPassword);

        const response = await handleResponse(http.patch('/user', formData));
        return response.code === 200;
    } catch (e) {
        return false;
    }
}
