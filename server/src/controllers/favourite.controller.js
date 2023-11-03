const { Favourite } = require("../models/favourite/Favourite");

const getFavourites = async (req, res) => {
  try {
    const userId = req.params.id;
    const favourites = await Favourite.findOne({ user: userId });

    if (!favourites) {
      return res
        .status(404)
        .send({ messsage: "You don't have any favourites." });
    }

    return res.status(200).json(favourites);
  } catch (error) {
    console.error("Error retrieving favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getFavourites };
