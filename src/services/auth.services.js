const mongoose = require('mongoose');
const bcrypt = require( 'bcrypt' );

const User = mongoose.model( 'User' );

const addUser = ( newUserDetails ) => {
    return User.create( newUserDetails );
};

const validateUser = async (loginUser) => {
    const user = await User.findOne({
        email: loginUser.email
    })

    if(!user){
        return res.status(404).json({message: "User don't exist!"})
    }

    const isMatch = await bcrypt.compare( loginUser.password, user.password );

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials!"})
    }

    return user;
}

module.exports = {
    addUser,
    validateUser
};