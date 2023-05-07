const Game = require("../../models/Game");

async function getGameStudent(req, res) {
  try {
    const game = await Game.findOne({
      subtopic: req.params.subtopic,
    });
    if (!game) {
      res.status(404).json({ message: "Game Not Found" });
    } else {
      if (game.state) {
        res.status(200).json({
          id: game._id,
          state: game.state,
          subtopic: game.subtopic,
          gamedata: game.gamedata,
        });
      } else {
        res.status(404).json({ message: "Game Not Submitted" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getGameStudent;
