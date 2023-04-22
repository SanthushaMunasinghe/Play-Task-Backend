const Game = require("../../models/Game");

async function createGame(req, res) {
  try {
    const existingGame = await Game.findOne({
      $and: [{ teacher: req.body.teacher }, { subtopic: req.body.subtopic }],
    });
    if (existingGame) {
      await existingGame.remove();
    }
    const game = new Game({
      teacher: req.body.teacher,
      subtopic: req.body.subtopic,
      state: false,
      gamedata: req.body.gamedata,
    });
    const newGame = await game.save();
    res.status(201).json({
      gameId: newGame._id,
      subtopic: newGame.subtopic,
      gamedata: newGame.gamedata,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createGame;
