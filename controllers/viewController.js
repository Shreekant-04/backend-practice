const Tour = require('../models/tourModel');
const Bokkings = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'Overview',
    tours
  });
});
exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login'
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });
  // if (!tour) {
  //   return next(new AppError('Tour not found.', 404));
  // }
  res.status(200).render('tour', {
    title: tour.name,
    tour
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My Account'
  });
};
exports.getBookings = async (req, res) => {
  const bookings = await Bokkings.find({ user: req.user._id });
  // console.log(bookings);
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('Overview', {
    title: 'My Bookings ',
    tours
  });
};
