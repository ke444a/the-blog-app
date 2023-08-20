interface IUserLoginCredentials {
    username: string;
    password: string;
}

interface IUserStoreData {
    user: User | null;
    accessToken: string;
}
