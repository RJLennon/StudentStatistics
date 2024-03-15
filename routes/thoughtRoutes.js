const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,

} = require('../controllers/thoughtController');

router.route('/thoughts').get(getThoughts).post(createThought);

router.route('/thoughts/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(addReaction);

router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
