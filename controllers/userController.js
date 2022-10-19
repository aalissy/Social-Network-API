// Const User and Thought require the models in the models folder
const { User, Thought } = require('../models');

module.exports = {
    // Route that gets all users
    getUser(req, res) {
       User.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    },
    // Route that gets one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then((data) => {
                if(!data) {                    
                    res.status(404).json( { message: "I'm sorry I couldn't find a user with this id please try again later!" } )
                }
                res.json(data)
            })
        .catch((err) => res.status(500).json(err));
    },
    // Route that creates a user
    createUser(req, res) {
        User.create(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    },
    // Route that updates a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((data) => {
        if(!data) {
            res.status(404).json( { message: "I'm sorry I couldn't find a user with this id please try again later!" } )
        }
        res.json(data)
    })
        .catch((err) => res.status(500).json(err));
    },
    // Route that deletes users
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.userId })
        .then((data) => {
        if(!data) {
            res.status(404).json( { message: "I'm sorry I couldn't find a user with this id please try again later!" } )
        }
        Thought.deleteMany( { _id: { $in: data.thoughts } } )
    })
        .then(() => res.json( { message: "Thoughts and User have been deleted! Thank you!" } ))
        .catch((err) => res.status(500).json(err));
    }, 
    // Route that adds friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((data) => {
            if(!data) {
                res.status(404).json( { message: "I'm sorry I couldn't find a user with this id please try again later!" } )
            }
            res.json(data)
    })
        .catch((err) => res.status(500).json(err));
    },
    // Route that deletes a friend
    deleteFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((data) => {
        if(!data) {
            res.status(404).json( { message: "I'm sorry I couldn't find a user with this id please try again later!" } )
        }
        res.json(data)
    })
        .catch((err) => res.status(500).json(err));
    },
};