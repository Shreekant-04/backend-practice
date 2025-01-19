const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getCheckout = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) return next(new AppError('There is no tour with that ID', 404));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: tour.name,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`
            ]
          },
          unit_amount: tour.price * 100
        },
        quantity: 1
      }
    ],
    payment_intent_data: {
      setup_future_usage: 'off_session'
    },
    success_url: `${req.protocol}://${req.get('host')}/my-bookings`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tour.id,
    expires_at: Math.floor((Date.now() + 30 * 60 * 1000) / 1000) // expires in 30 minutes
  });
  // console.log(session);
  // console.log(
  //   `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
  // );

  res.status(200).json({
    status: 'success',
    session
  });
});

exports.createTourBooking = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) return next();
  await Booking.create({
    tour,
    user,
    price
  });
  res.redirect(req.originalUrl.split('?')[0]);
});
