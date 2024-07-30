import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Section Is Required!"],
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL Required!"],
  },
  githubURL: {
    type: String,
    required: [true, "Github URL Is Required!"],
  },
  instagramURL: {
    type: String,
    required: [true, "Instagram URL Is Required!"],
  },
  twitterURL: {
    type: String,
    required: [true, "Twitter URL Is Required!"],
  },
  linkedInURL: {
    type: String,
    required: [true, "LinkedIn URL Is Required!"],
  },
  facebookURL: {
    type: String,
    required: [true, "Facebook URL Is Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};


//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);