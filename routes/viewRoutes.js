const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();
router.get('/me', authController.protect, viewController.getAccount);
router.get(
  '/',
  bookingController.createTourBooking,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get('/login', authController.isLoggedIn, viewController.getLogin);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

module.exports = router;
