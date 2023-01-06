const mongoose = require('mongoose');

const User = mongoose.model( 'User' );

const getWatchlist = async (_id) => {
    const data = await User.findOne({ _id });

    return data.watchlist;
}

const addToList = async (id, stock) => {

    const watchlist = await User.findOne({
        $and: [
            {
                _id: id
            },
            {
                watchlist : stock
            }
        ]
    });
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

const deleteFromList = async (id, stock) => {

    const watchlist = await User.findOne({
        $and: [
            {
                _id: id
            },
            {
                watchlist : stock
            }
        ]
    });
    if(!watchlist){
        return null
    }

    const data = await User.updateOne(
        { 
            _id: id 
        },
        {
            $pull:{
                watchlist: stock
            }
        }
    );

    return data;
}

module.exports = {
    getWatchlist,
    addToList,
    deleteFromList
};