const Game = require("../../models/Game");

async function getGame(req, res) {
  try {
    const game = await Game.findOne({
      $and: [
        { teacher: req.params.teacher },
        { subtopic: req.params.subtopic },
      ],
    });
    if (!game) {
      res.status(404).json({ message: "Game Not Found" });
    } else {
      res.status(200).json({
        id: game._id,
        gamedata: game.gamedata,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getGame;
