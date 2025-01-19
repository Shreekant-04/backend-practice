const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// bookingSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'tour',
//     select: 'name'
//   }).populate({
//     path: 'user',
//     select: 'name'
//   });
//   next();
// });

module.exports = mongoose.model('Bookings', bookingSchema);
