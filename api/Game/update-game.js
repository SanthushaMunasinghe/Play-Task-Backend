const Game = require("../../models/Game");

async function updateGame(req, res) {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      game.gamedata = req.body.gamedata;
      await game.save();
      res.status(200).json({ success: "Game updated successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateGame;
