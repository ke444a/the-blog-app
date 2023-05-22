interface UserLoginCredentials {
    username: string;
    password: string;
}

// interface UserSignupCredentials {
//     username: string;
//     password: string;
//     password2: string;
//     fullName: string;
//     bio?: string;
//     avatar:? string;
// }

interface UserReturnData {
    user: User;
    accessToken: string;
}
