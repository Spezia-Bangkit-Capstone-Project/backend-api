const Spice = require("../model/spice");
const { upload } = require("../middleware/uploadFile");
const axios = require("axios").default;
const FormData = require("form-data");

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

    // append image into formdata
    const formData = new FormData();
    formData.append("image", req.file.buffer, req.file.originalname);

    // predict image
    axios
      .post("http://localhost:3000/predict", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const accuracy = response.data.data.confidence;
        const name = response.data.data.prediction;
        const spice = await Spice.findOne({
          attributes: [
            ["id", "spiceId"],
            "name",
            "latin_name",
            "image",
            "description",
            ["benefit", "benefits"],
          ],
          where: {
            name: name,
          },
        });

        // reformat spices benefits value and to string spiceId
        spice.setDataValue(
          "benefits",
          spice.getDataValue("benefits").split(",")
        );

        return res.json({
          error: false,
          message: "Prediction image successfully",
          predictionResult: {
            accuracy: accuracy,
            ...spice.dataValues,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).send(error);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

module.exports = { all, scan };
