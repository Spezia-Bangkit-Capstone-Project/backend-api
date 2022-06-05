const Spice = require("../model/spice");
const { upload } = require("../middleware/uploadFile");

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

    // reformat spices benefits value and to string spiceId
    spices.forEach((spice) => {
      spice.setDataValue("spiceId", spice.getDataValue("spiceId").toString());
      spice.setDataValue("benefits", spice.getDataValue("benefits").split(","));
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

const scan = async (req, res) => {
  try {
    // check image is available or not
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "Image is required",
      });
    }

    // check mimetype
    if (
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/webp"
    ) {
      return res.status(400).json({
        error: true,
        message: "Only .png, .jpg, .jpeg, and .webp format allowed!",
      });
    }

    const imageUrl = await upload(req.file);

    return res.json({
      error: false,
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = { all, scan };
