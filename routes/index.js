// Const router that requires express router
const router = require ("express").Router();
// const apiRoutes that requires the routes from api
const apiRoutes = require("./api");
// Uses the /api paramater on all the created apiRoutes
router.use("/api", apiRoutes);

// Exporting the router
module.exports = router;