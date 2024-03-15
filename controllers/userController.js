const User = require('../models/User');

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.updateOne(
        { _id: req.params.userId },
        { $set: req.body }
      );
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.deleteOne({ _id: req.params.userId });
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //add a friend to a user
  async addFriend(req, res) {
    try {
      const dbUserData = await User.updateOne(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } }
      );
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //remove a friend from a user
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.updateOne(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
