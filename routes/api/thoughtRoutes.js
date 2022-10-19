// Const router that requires express
const router = require('express').Router();
// Gets all the routes created from the thoughtController
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought, 
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Exporting the router
module.exports = router;