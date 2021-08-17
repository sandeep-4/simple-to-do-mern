const multer = require("multer");
const path = require("path");

const busImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/busimage");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const ownerAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/ownAvatar");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.uploadBusImage = multer({ storage: busImage }).single("image");
exports.uploadOwnerAvatar = multer({ storage: ownerAvatar }).single("photo");
