const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/me', authController.protect, viewController.getAccount);

router.use(authController.isLoggedIn);
router.get('/', viewController.getOverview);
router.get('/login', viewController.getLogin);

router.get('/tour/:slug', viewController.getTour);

module.exports = router;
