const Spice = require("../model/spice");

const all = async (req, res) => {
  try {
    // get all data spices
    const spices = await Spice.findAll({
      attributes: [
        ["id", "spiceId"],
        "name",
        "latin_name",
        "image",
        "description",
      ],
    });

    return res.json({
      error: false,
      message: "Data spices fetched successfully",
      spicesResult: spices,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).end();
  }
};

const detail = async (req, res) => {
  return res.send("this is detail dictionary");
};

module.exports = { all, detail };
