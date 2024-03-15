import mongoose, { models, Schema } from "mongoose";
const userSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
