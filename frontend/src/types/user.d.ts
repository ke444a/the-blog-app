interface IUser {
    id: string;
    username: string;
    fullName: string;
    password: string;
    bio: string;
    avatar: string | File | null;
}
