const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    colaboratorIds: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", ArticleModel);
