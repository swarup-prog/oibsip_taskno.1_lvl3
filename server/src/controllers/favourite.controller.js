const { Favourite } = require("../models/favourite/Favourite");

const getFavourites = async (req, res) => {
  try {
    const userId = req.params.id;
    const favourites = await Favourite.find({ user: userId })
      .populate("pizzaBase", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("cheese", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("sauce", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("veggies", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("meat", { description: 0, quantity: 0, type: 0, __v: 0 });

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
