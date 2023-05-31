const maskingProperty = require("./masking-property");

const maskingRequest = (data, content) => {
  for (const property of maskingProperty[content]) {
    if (data.hasOwnProperty(property)) {
      data[property] = "***";
    }
  }
};

const maskingResponse = (data, content) => {
  if (Array.isArray(data.data)) {
    console.log(data["data"]);
    data["data"].forEach((data) => {
      console.log(data);
      if (data.hasOwnProperty("image")) {
        data["image"] = "...";
      }
    });
  } else if (typeof data == "object") {
    data.data.image = "...";
  }

  for (const property of maskingProperty[content]) {
    if (data.data.hasOwnProperty(property)) {
      data.data[property] = "***";
    }
  }
};

module.exports = { maskingRequest, maskingResponse };
