import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "username is required!"],
    match: [
      /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 6-20 alphanumeric letters and be unique!",
    ],
  },

  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
