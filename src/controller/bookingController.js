const Event = require('../model/Events')
const Booking = require('../model/Booking')
const getNextId = require('../utils/idGenrator')
const globalCalls = require('../utils/globalCalls')


const mongoose = require('mongoose')


const createBooking = async (req, res) => {
    try {
      const { eventId, qty } = req.body;
      if (!eventId || !qty) return globalCalls.badRequest(res, 'eventId & qty required');
  
      const ev = await Event.findOneAndUpdate(
        { _id: eventId, seatsLeft: { $gte: qty }, status: 'PUBLISHED' },
        { $inc: { seatsLeft: -qty } },
        { new: true }
      );
      if (!ev) return globalCalls.badRequest(res, 'Not enough seats or event not available');
  
      const bookingId = await getNextId('booking', 'BK');
      const booking = await Booking.create({
        bookingId,
        event: ev._id,
        user: req.user._id,
        qty,
        amount: (ev.price || 0) * qty
      });
  
  
      return globalCalls.successData(res, 'Booking created', { booking });
    } catch (err) {
      if (req.body && req.body.eventId && req.body.qty) {
        try {
          await Event.findByIdAndUpdate(req.body.eventId, { $inc: { seatsLeft: req.body.qty } });
        } catch (e) { }
      }
      return globalCalls.serverError(res, err.message);
    }
  };



const myBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user._id }).populate('event');
      return globalCalls.successData(res, 'Your bookings', { bookings });
    } catch (err) {
      return globalCalls.serverError(res, err.message);
    }
  };
  
module.exports = myBookings