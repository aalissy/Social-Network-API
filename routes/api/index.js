// Const router that requires express
const router = require('express').Router();
// Const userRoutes that requires userRoutes
const userRoutes = require('./userRoutes');
// Const thoughtRoutes that requires thoughtRoutes
const thoughtRoutes = require('./thoughtRoutes');

// Uses the userRoutes as /users
router.use('/users', userRoutes);
// Uses the thoughtRoutes as /thoughts
router.use('/thoughts', thoughtRoutes);

// Exporting the router
module.exports = router;