const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    type: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    isStarred: {
      type: Boolean,
      default: false,
    },
    isViewed: {
      type: Boolean,
      default: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

entrySchema.plugin(uniqueValidator);
entrySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
