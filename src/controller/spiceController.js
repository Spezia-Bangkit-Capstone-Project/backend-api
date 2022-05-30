const {Storage} = require('@google-cloud/storage');

const all = async (req, res) => {
    return res.send("this is dictionary");
}

const detail = async (req, res) => {
    return res.send("this is detail dictionary")
}

module.exports = {all};