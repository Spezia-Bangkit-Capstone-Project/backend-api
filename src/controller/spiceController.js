const Spice = require("../model/spice");
const axios = require("axios").default;
const FormData = require("form-data");
const Joi = require("joi");

const all = async (req, res) => {
  try {
    // get all data spices
    const spices = await Spice.aggregate([
      {
        $project: {
          _id: 0,
          spiceId: "$_id",
          name: 1,
          latin_name: 1,
          image: 1,
          description: 1,
          benefits: "$benefit",
        },
      },
    ]);

    // reformat spices benefits value and to string spiceId
    spices.forEach((spice) => {
      spice.benefits = spice.benefits.split(",");
    });

    return res.json({
      error: false,
      message: "Data spices fetched successfully",
      data: spices,
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
      .post(process.env.PREDICT_URL, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const confidence = response.data.data.confidence;
        const name = response.data.data.prediction;
        const spice = await Spice.findOne({
          name: { $regex: name, $options: "i" },
        });

        return res.json({
          error: false,
          message: "Prediction image successfully",
          data: {
            confidence: confidence,
            spiceId: spice.id,
            name: spice.name,
            latin_name: spice.latin_name,
            image: spice.image,
            description: spice.description,
            benefits: spice.benefit.split(","),
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

const getByName = async (req, res) => {
  try {
    const rules = Joi.object({
      name: Joi.string().required(),
    });
    const { error } = rules.validate(req.query);

    // if form data is invalid
    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    // get spice by name
    const spice = await Spice.findOne({
      name: { $regex: req.query.name, $options: "i" },
    });

    // if data exist
    if (spice) {
      return res.json({
        error: false,
        message: "Data spice fetched successfully",
        data: {
          spiceId: spice.id,
          name: spice.name,
          latin_name: spice.latin_name,
          image: spice.image,
          description: spice.description,
          benefits: spice.benefit.split(","),
        },
      });
    }

    return res.status(404).json({
      error: true,
      message: "Data spice not found",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error); // validation form data
  }
};

module.exports = { all, scan, getByName };
