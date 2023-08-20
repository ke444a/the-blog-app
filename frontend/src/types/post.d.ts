interface IPost {
    id: string;
    title: string;
    content: string;
    preview: string;
    likesNumber: number;
    postImg: string | File;
    comments: IComment[];
    author: IUser;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}
