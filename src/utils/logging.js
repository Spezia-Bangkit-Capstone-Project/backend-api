const morgan = require("morgan");
const masking = require("./masking");

morgan.token("req-headers", function (req, res) {
  masking.maskingRequest(req.headers, "header");
  return JSON.stringify(req.headers);
});
morgan.token("req-body", function (req, res) {
  if (!req.body) {
    masking.maskingRequest(req.body, "body");
  }
  return JSON.stringify(req.body);
});
morgan.token("res-headers", function (req, res) {
  const headers = { ...res.getHeaders() };
  masking.maskingRequest(headers, "header");
  return JSON.stringify(headers);
});
morgan.token("res-body", function (req, res) {
  if (res.resBody) {
    const body = { ...JSON.parse(res.resBody) };
    if (body.hasOwnProperty("data")) {
      masking.maskingResponse(body, "body");
    }
    return JSON.stringify(body);
  }
  return JSON.stringify({});
});

module.exports = morgan;
