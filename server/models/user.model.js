const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      public_id: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = User = mongoose.model("user", UserSchema);
