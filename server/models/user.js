const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uuid = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    phone: {
      type: Number,
      maxlenth: 9999999999,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    salt: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this.password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.password;
  });

userSchema.methods = {
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

module.exports = mongoose.model("User", userSchema);
