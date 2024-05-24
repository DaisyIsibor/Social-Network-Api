const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/userRoutes', userRoutes);
router.use('/thoughtRoutes', thoughtRoutes);

module.exports = router;
