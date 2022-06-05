const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

// configure gcs
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// configure multer
const multer = Multer({
  storage: Multer.memoryStorage(),
});

// upload file
const upload = (file) =>
  new Promise((resolve, rejects) => {
    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}-${file.originalname.replace(/ /g, "-")}`;

    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${blob.name}`;

      resolve(publicUrl);
    });

    blobStream.on("error", (err) => console.log(err));

    blobStream.end(file.buffer);
  });

module.exports = { multer, upload };
