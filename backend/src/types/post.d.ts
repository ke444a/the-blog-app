interface IPost {
    title: string;
    content: string;
    preview: string;
    likesNumber: number;
    userId: Types.ObjectId;
    comments: Types.ObjectId[];
    postImg?: string;
}
