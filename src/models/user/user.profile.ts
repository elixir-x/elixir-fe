export interface UserProfile {
    _id: string,
    email: string,
    username: string,
    password: string,
    profileUrl?: string,
    lastLogin: Date,
    createdOn: Date,
}
