const express = require('express');
const { auth, permit } = require('../middlewares/auth');
const ctrl = require('../controller/bookingController');
const router = express.Router();

router.get('/me', auth, permit('CUSTOMER'), ctrl);

module.exports = router;
