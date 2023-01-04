const mongoose = require( 'mongoose' );

// global configurations for queries
mongoose.set( 'returnOriginal', false );
mongoose.set( 'runValidators', true );
mongoose.set('strictQuery', true);

require( '../models/User' );

const { CONNECTION_URL } = process.env

const connect = async () => {
    try {
        await mongoose.connect( CONNECTION_URL );
        console.log( 'conncted to the db' );
    } catch( error ) {
        console.log( error.message );
        throw error;
    }
};

module.exports = {
    connect
};






