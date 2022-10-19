// Const User and Thought require the models in the models folder
const {User, Thought} = require('../models');

module.exports = {
    // Route that gets all thoughts
    getThoughts(req,res) {
        Thought.find({})
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    },
    // Route that gets one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((data) => {
                if (!data) {
                    res.status(404).json( { message: "I'm sorry I can't find this thought please try again later!" } )
                }
            res.json(data)
        })
            .catch((err) => res.status(500).json(err));
    },
    // Route that creates thoughts
    createThought(req, res) {
        Thought.create(req.body)
        .then((myThoughts) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId },
                { $push: { thoughts: myThoughts._id } },
                { new: true },
            );
        })
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
    },
    // Route that updates thoughts
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((data) => {
            if(!data) {
                res.status(404).json( { message: "I'm sorry I can't find this thought please try again later!" } )
            } 
        res.json(data)
    })
        .catch((err) => res.status(500).json(err)); 
    },
    // Route that deletes thoughts
    deleteThought(req, res) {
        Thought.findByIdAndDelete( { _id: req.params.thoughtId } )
        .then((data) => {
            if(!data) {
                res.status(404).json( { message: "I'm sorry I can't find this thought please try again later!" } )
            }
            User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
                )
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json( { message: "I'm sorry, I couldn't find this user please try again later!"} )
            }
            res.json({ message: "Thought was deleted!"})
        })
        .catch((err) => res.status(500).json(err)) ;
    },
    // Route that creates reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate( 
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((data) => {
            if(!data) {
                res.status(404).json( { message: "I'm sorry I can't find this thought please try again later!" } )
            }
            res.json(data)
        })
      .catch((err) => res.status(500).json(err)); 
    },
    // Route that deletes reactions
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((data) => {
        if (!data) {
            res.status(404).json( { message: "I'm sorry I can't find this thought please try again later!" } )
        }
        res.json(data)
    })
      .catch((err) => res.status(500).json(err)); 
    },
};