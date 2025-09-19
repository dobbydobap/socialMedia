import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //features we can see in our our acount 
  //cloudinary - tool for assest managment 
  profilepic: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers:[],
  following:[],
  posts: [],
  reels: [],
  stories: []

});

const User = mongoose.model("User", userSchema);
export default User;
