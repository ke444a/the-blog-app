import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: "Unable to get the posts" });
    }
};

export const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post has not been found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: "Unable to get the data about this post" });
    }
};

export const createPost = async (req, res) => {
    try {
        let postImg = "";
        if (req?.file) {
            postImg = req.protocol + "://" + req.hostname + `:${process.env.PORT}/uploads/posts/` + req.file.filename;
        }

        const newPost = new Post({
            ...req.body,
            postImg
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: "Unable to create this post" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatedPost = Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Unable to update this post"});
    }
};

export const deletePost = async (req, res) => {
    try {
        const deletingPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletingPost) {
            return res.status(404).json({ message: "Post has not been found" });
        }

        res.status(200).json({ message: "Post has been deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Unable to delete this post" });
    }
};

export const getPostsByAuthor = async (req, res) => {
    try {
        const postsByUser = await Post.find({ authorId: req.params.id });
        res.status(200).json(postsByUser);
    } catch (error) {
        res.status(400).json({ message: "Unable to get posts for this author" });
    }
};
