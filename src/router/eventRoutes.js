const express = require('express');
const {auth ,permit} = require('../middlewares/auth')
const ctrl = require('../controller/eventController')
const router  = express.Router()


router.post('/', auth, permit('ORGANIZER'), ctrl.createEvent);
router.patch('/:id', auth, permit('ORGANIZER'), ctrl.updateEvent);
router.post('/:id/publish', auth, permit('ORGANIZER'), ctrl.publishEvent);


module.exports =router