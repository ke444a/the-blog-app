interface UserLoginCredentials {
    username: string;
    password: string;
}

interface UserStoreData {
    user: User | null;
    accessToken: string;
}
