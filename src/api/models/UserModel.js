const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    // ketika delete data dinonaktifkan
    isDeactivated: {
      type: Boolean,
      required: false,
    },
    // buat konfirmasi email
    isActivated: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserModel);
