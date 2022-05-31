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
        ["benefit", "benefits"],
      ],
    });

    // reformat spices benefits value
    spices.forEach((spice) =>
      spice.setDataValue(
        "benefits",
        spice
          .getDataValue("benefits")
          .split(",")
      )
    );

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

module.exports = { all };
