const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
