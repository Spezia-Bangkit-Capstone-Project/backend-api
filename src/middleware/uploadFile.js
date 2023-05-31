const Multer = require("multer");

// configure multer
const multer = Multer({
  storage: Multer.memoryStorage(),
});

module.exports = { multer };
