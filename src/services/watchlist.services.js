const mongoose = require('mongoose');

const User = mongoose.model( 'User' );

const getWatchlist = async (email) => {

    const data = await User.findOne({ email });

    return data.watchlist;
}

const addToList = async (id, stock) => {

    const watchlist = await User.findOne({
        watchlist : stock
    })
    if(watchlist){
        return null
    }

    const data = await User.updateOne(
        { 
            _id: id 
        },
        {
            $push:{
                watchlist: stock
            }
        }
    );

    return data;
}

module.exports = {
    getWatchlist,
    addToList
};