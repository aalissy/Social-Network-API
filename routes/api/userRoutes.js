// Const router that requires express
const router = require('express').Router();
// Gets all the routes created from the userController
const {
    getUser,
    getOneUser,
    createUser,
    updateUser, 
    deleteUser, 
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Exporting the router
module.exports = router; 