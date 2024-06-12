const passport = require('passport');
// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Adjust the path to your User model
require('dotenv').config();
const expressSession = require('express-session');
const { errorResponse } = require('../helper');

const configurePassportMiddleware = (req, res, next) => {



    token = (req.headers.authorization)

    jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
            // JWT verification failed
            return errorResponse(res, "Token not Provided")
        } else {
            // JWT is valid
            console.log('JWT is valid:', decoded);

            const decodedToken = jwt.decode(decoded.token, { complete: true });
            console.log(decodedToken.payload.id)

            req.user = decodedToken.payload.id
            next()
        }
    });


};
module.exports = { configurePassportMiddleware };