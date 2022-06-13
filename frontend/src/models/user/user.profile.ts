export interface UserProfile {
    _id: string,
    email: string,
    username: string,
    password: string,
    profile_url?: string,
    lastLogin: Date,
    createdOn: Date,
}
