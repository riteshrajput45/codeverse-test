const Counter = require('../model/Counters');

async function getNextId(key, prefix, length=4) {
 
  const doc = await Counter.findByIdAndUpdate(
    key,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const num = doc.seq.toString().padStart(length, '0');
  return `${prefix}-${num}`; // EVT-0001 or BK-0001
}

module.exports = getNextId;
