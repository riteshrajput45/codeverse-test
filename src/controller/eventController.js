const Event = require('../model/Events')
const  getNextId = require('../utils/idGenrator')
const globalCalls = require('../utils/globalCalls')





 const createEvent = async (req, res) => {
    try {
      const data = req.body;
      data.organizer = req.user._id;
  
      data.seatsLeft = data.totalSeats;
  
      const eventId = await getNextId('event', 'EVT');
      data.eventId = eventId;
  
      const event = await Event.create(data);
      return globalCalls.successData(res, 'Event created', { event });
    } catch (err) {
      return globalCalls.serverError(res, err.message);
    }
}

const updateEvent = async (req, res) => {
    try {
      const ev = await Event.findById(req.params.id);
      if (!ev) return globalCalls.badRequest(res, 'Event not found');
      if (ev.organizer.toString() !== req.user._id.toString()) return globalCalls.badRequest(res, 'Not owner');
  
      Object.assign(ev, req.body);
      await ev.save();
      return globalCalls.successData(res, 'Event updated', { event: ev });
    } catch (err) {
      return globalCalls.serverError(res, err.message);
    }
  };
  const publishEvent = async (req, res) => {
    try {
      const ev = await Event.findById(req.params.id);
      if (!ev) return globalCalls.badRequest(res, 'Event not found');
      if (ev.organizer.toString() !== req.user._id.toString()) return globalCalls.badRequest(res, 'Not owner');
  
      ev.status = 'PUBLISHED';
      await ev.save();
      return globalCalls.successData(res, 'Event published', { event: ev });
    } catch (err) {
      return globalCalls.serverError(res, err.message);
    }
  };

module.exports= {createEvent,updateEvent,publishEvent}