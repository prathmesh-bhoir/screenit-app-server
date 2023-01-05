require("../models/User");
const express = require('express');
const { authorize } = require( '../middleware/authorize' );
const watchlistCtrl = require('../controllers/watchlist.controllers');

const router = express.Router();

router.get('/', authorize, watchlistCtrl.getWatchlist)
router.patch('/', authorize, watchlistCtrl.addToList);
router.patch('/delete', authorize, watchlistCtrl.deleteFromList);

module.exports = router;