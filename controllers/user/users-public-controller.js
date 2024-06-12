const usersSchema = require("../../models/users.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fn = require("../../helper/index.js")
require('dotenv').config();

const usersRegister = async (req, res) => {

    const name = req.body.name || "";
    const email = req.body.email || "";
    const password = req.body.password || "";


    try {

        const result = await usersSchema.find({ email: email });

        if (result.length === 0) {
            const encpassword = await bcrypt.hash(password, 10);

            const info = new usersSchema({
                name: name,
                email: email,
                password: encpassword,
                created_at: new Date()
            });

            const saveResult = await info.save();

            return fn.successResponse(res, "registration Successfull, ",)
        } else {


            return fn.errorResponse(res, "Email already exists")
        }


    } catch (error) {
        return fn.errorResponse(res, 'Something Went Wrong', error);
    }

}


const usersLogin = async (req, res) => {

    const email = req.body.email || "";
    const password = req.body.password || "";

    try {
        const response = await usersSchema.findOne({ email: email }).exec();

        if (!response) {
            return errorResponse(res, "User not found!");
        }

        const result = await bcrypt.compare(password, response.password);

        if (result) {



            console.log(process.env.secret);
            console.log(response.id);
            const token = jwt.sign({ id: response.id }, process.env.secret, { expiresIn: "24h" });


            return fn.successResponse(res, "Login Successful", { token: token });
        } else {
            return fn.errorResponse(res, "Invalid Credentials");
        }
    } catch (err) {
        return fn.errorResponse(res, "An error occurred during login", err.message || "Unknown Error");
    }
};

module.exports = {
    usersRegister,
    usersLogin,

}