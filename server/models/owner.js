const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuid = require("uuid");
const crypto = require("crypto");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    citizenshipNumber: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    phone: {
      type: Number,
      maxlenth: 9999999999,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      trim: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    salt: String,
    role: {
      type: String,
      enum: ["owner", "superadmin"],
      default: "owner",
    },
  },
  { timestamps: true }
);

ownerSchema
  .virtual("password")
  .set(function (password) {
    this.password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.password;
  });

ownerSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("Owner", ownerSchema);
