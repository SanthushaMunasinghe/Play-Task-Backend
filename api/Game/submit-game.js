const Game = require("../../models/Game");

async function submitGame(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      game.state = true;
      await game.save();
      res.status(200).json({ success: "Game submitted successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = submitGame;
