require("../models/User");
const express = require('express');
const { authorize } = require( '../middleware/authorize' );
const watchlistCtrl = require('../controllers/watchlist.controllers');

const router = express.Router();

router.get('/', authorize, watchlistCtrl.getWatchlist)
router.patch('/add', authorize, watchlistCtrl.addToList);
router.patch('/del', authorize, watchlistCtrl.deleteFromList);

module.exports = router;