interface Post {
    _id: string;
    title: string;
    content: string;
    preview: string;
    likesNumber: number;
    comments: Comment[];
    postImg: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    postId: string;
}

interface User {
    _id: string;
    username: string;
    fullName: string;
    password: string;
    bio: string;
    avatar: string;
}
