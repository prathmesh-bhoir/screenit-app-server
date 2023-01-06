const jwt = require( 'jsonwebtoken' );
// const userService = require( '../services/auth.services' );
const { Errors } = require( '../constants' );
const mongoose = require('mongoose');
const bcrypt = require( 'bcrypt' );

const User = mongoose.model( 'User' );

const register = async (req, res, next) => {
    if( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json({
            status: 'error',
            message: `Request body is missing, and needs to have user details`
        });
    }

    try {
        const { email } = req.body;
        const existinguser = await User.findOne({ email });
        if(existinguser){
            return res.status(404).json({message: "User already exist!"})
        }

        const user = await User.create( req.body );

        user.toObject();

        const userDetails = { name: user.name, email: user.email }

        res.status( 201 ).json({
            status: 'success',
            data: userDetails
        });
    } catch (error) {
        next(error)
    }
}

const login = async ( req, res ) => {
    if( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json({
            status: 'error',
            message: `Request body is missing, and needs to have login details`
        });
    }

    const { email, password } = req.body;

    try {

        const existinguser = await User.findOne({ email });
        if(!existinguser){
            return res.status(404).json({message: "User don't exist!"})
        }

        const isPasswordCrt = await bcrypt.compare( password, existinguser.password )
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid Password!"})
        }

        const claims = {
            id: existinguser._id,
            email: existinguser.email,
        };

        const token = jwt.sign( { claims } , process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(claims)

        res.json({
            status: 'success',
            data: {
                name: existinguser.name,
                email,
                token
            }
        });
    } catch (error) {
        const err = new Error( 'Something went wrong during login' );
        err.name = Errors.InternalServerError;
        return next( err );       
    }
    
}

module.exports = {
    register,
    login
};