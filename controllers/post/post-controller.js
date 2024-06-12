const postsSchema = require("../../models/posts.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fn = require("../../helper/index.js")
require('dotenv').config();

const createPost = async (req, res) => {
    try {
        const { title, body, active, latitude, longitude } = req.body;
        const createdBy = req.user; // Assuming req.user contains the ID of the authenticated user

        const post = new postsSchema({
            title,
            body,
            createdBy,
            active,
            latitude,
            longitude,
            created_at: new Date()
        });

        const savedPost = await post.save();
        return fn.successResponse(res, savedPost);
    } catch (error) {
        return fn.errorResponse(res, 400, error.message);
    }
}

const postsList = async (req, res) => {
    try {
        const posts = await postsSchema.find();
        return fn.successResponse(res, posts);
    } catch (error) {
        return fn.errorResponse(res, 500, error.message);
    }
}

const postDetails = async (req, res) => {
    try {
        const post = await postsSchema.findById(req.params.id);
        if (!post) {
            return fn.errorResponse(res, 404, 'Post not found');
        }
        return fn.successResponse(res, post);
    } catch (error) {
        return fn.errorResponse(res, 500, error.message);
    }
}
const updatePost = async (req, res) => {
    try {
        const { title, body, active, latitude, longitude } = req.body;
        const postId = req.params.id;

        // Find the post by ID
        const post = await postsSchema.findById(postId);
        if (!post) {
            return fn.errorResponse(res, 404, 'Post not found');
        }

        // Check if the authenticated user is the creator of the post
        if (post.createdBy.toString() !== req.user) {
            return fn.errorResponse(res, 403, 'You are not authorized to update this post');
        }

        // Update the post
        const updatedPost = await postsSchema.findByIdAndUpdate(postId, {
            title,
            body,
            active,
            latitude,
            longitude
        }, { new: true });

        return fn.successResponse(res, updatedPost);
    } catch (error) {
        return fn.errorResponse(res, 400, error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find the post by ID
        const post = await postsSchema.findById(postId);
        if (!post) {
            return fn.errorResponse(res, 404, 'Post not found');
        }

        // Check if the authenticated user is the creator of the post
        if (post.createdBy.toString() !== req.user) {
            return fn.errorResponse(res, 403, 'You are not authorized to delete this post');
        }

        // Delete the post
        const deletedPost = await postsSchema.findByIdAndDelete(postId);
        return fn.successResponse(res, { message: 'Post deleted successfully' });
    } catch (error) {
        return fn.errorResponse(res, 500, error.message);
    }
}
module.exports = {
    createPost, postsList, postDetails,
    updatePost,
    deletePost,
}