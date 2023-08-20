interface IComment {
    id: string;
    content: string;
    updatedAt: string;
    author: IUser;
    postId: string;
}
