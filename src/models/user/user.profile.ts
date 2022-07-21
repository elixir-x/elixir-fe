export interface UserProfile {
    _id: string,
    email: string,
    username: string,
    password: string,
    bio?: string,
    profileUrl?: string,
    profileBlob?: Blob
    lastLogin: Date,
    createdOn: Date,
}
