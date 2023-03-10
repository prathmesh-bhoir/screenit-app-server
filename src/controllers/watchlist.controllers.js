const { Errors } = require( '../constants' );
const watchlistServices = require('../services/watchlist.services')

const getWatchlist = async (req, res, next) => {
    const {id} = res.locals.claims;
    try {
        const watchlist = await watchlistServices.getWatchlist(id);
  
        res.status( 201 ).json({
            status: 'success',
            data: watchlist
        });   
    } catch (error) {
        console.log(error)
        return next( error ); 
    }
}

const addToList = async (req, res, next) => {

    const { stock } = req.query
    
    const { id } = res.locals.claims;
    try {      
        const data = await watchlistServices.addToList(id, stock)
        
        if(data == null){
            return res.status( 400 ).json({
                status: 'error',
                message: `Already added to watchlist!`
            });
        }

        res.status( 201 ).json({
            status: 'success',
            message: 'Added to watchlist successfully!'
        });
    } catch (error) {
        console.log(error)
        return next(error)
    }
}

const deleteFromList = async (req, res, next) => {
    console.log(req.query)
    const { stock } = req.query
    const { id } = res.locals.claims;
    console.log(id)
    try {      
        const data = await watchlistServices.deleteFromList(id, stock)
        
        if(data == null){
            return res.status( 404 ).json({
                status: 'error',
                message: `Does not exist in the watchlist!`
            });
        }
        res.status( 201 ).json({
            status: 'success',
            message: 'Removed from watchlist successfully!'
        });
    } catch (error) {
        console.log(error)
        return next(error)
    }
}


module.exports = {
    addToList,
    getWatchlist,
    deleteFromList
};