const usersSchema = require("../../models/users.js");
const Post = require("../../models/posts.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fn = require("../../helper/index.js")
require('dotenv').config();

const dashboard = async (req, res) => {

    // Count active posts
    const activeCount = await Post.countDocuments({ active: true });
    console.log(activeCount);
    // Count inactive posts
    const inactiveCount = await Post.countDocuments({ active: false });

    return fn.successResponse(res, { activeCount, inactiveCount });


}
module.exports = {
    dashboard
}