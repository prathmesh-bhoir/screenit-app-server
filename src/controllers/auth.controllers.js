const jwt = require( 'jsonwebtoken' );
const UserService = require( '../services/auth.services' );
const { Errors } = require( '../constants' );

const register = async (req, res, next) => {
    if( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json({
            status: 'error',
            message: `Request body is missing, and needs to have user details`
        });
    }

    try {
        const user = await UserService.addUser( req.body );

        const userObj = user.toObject();

        delete userObj.password;

        res.status( 201 ).json({
            status: 'success',
            data: userObj
        });
    } catch (error) {
        next(error)
    }
}

const login =  async (req, res, next) => {
    if( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json({
            status: 'error',
            message: `Request body is missing, and needs to have login details`
        });
    }

    try {
        const user = await UserService.validateUser( req.body );

        if( !user ) {
            const error = new Error( 'Invalid credentials' );
            error.name = Errors.Unauthorized;
            return next( error );
        }

        jwt.sign( {email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' }, ( err, token ) => {
            if( err ) {
                err.name = Errors.InternalServerError;
                return next( err );
            }

            res.json({
                status: 'success',
                data: {
                    name: user.name,
                    email: user.email,
                    token
                }
            });
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