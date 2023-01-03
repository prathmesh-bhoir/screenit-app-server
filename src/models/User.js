const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    watchlist: {
        type: [String]
    }
})

const emailPat = /^[a-z0-9_\.]+@[a-z0-9_]+\.[a-z]{2,3}$/;
const passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

userSchema.path( 'email' ).validate(function( value ) {
    return emailPat.test( value );
});

userSchema.path( 'password' ).validate(function( value ) {
    return passwordPat.test( value );
});

module.exports = mongoose.model( 'User', userSchema );