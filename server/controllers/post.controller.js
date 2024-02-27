const Post = require("../models/post.model");
const User = require("../models/user.model");

module.exports.findAllPosts = async (req, res) => {
    try {
        const post = await Post.find().populate("user");
        res.status(200);
        res.json(post);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.findPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ _id: id }).populate("user");
        if (post) {
            res.status(200);
            res.json(post);
            return;
        }
        res.status(404);
        res.json({ error: "Post no encontrado" });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);

        // Añade el post al usuario en su lista de transacciones
        const userId = req.body.user;
        const user = await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } }, { new: true });

        res.status(201);
        res.json(newPost);
        console.log("se ha creado exitosamente!");
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPost = await Post.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        res.status(200);
        res.json(updatedPost);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
module.exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!user) {
            res.status(404);
            return res.json({ error: "User not found for transaction" });
        }

        // Busca el usuario que tenga el post
        const user = await User.findOneAndUpdate(
            { posts: postId },
            { $pull: { posts: postId } }
        );

        const deletedPost = await Post.deleteOne({ _id: postId });

        res.status(200);
        res.json(deletedPost);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};