const jwt = require( 'jsonwebtoken' );
const { Errors } = require( '../constants' );

const authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization

        jwt.verify( token, process.env.JWT_SECRET, ( err, claims ) => {
            if( err ) {
                err.name = Errors.Unauthorized;
                return next( err );
            }
            
            res.locals.claims = claims;
            
            next();
        });
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = {
    authorize
}