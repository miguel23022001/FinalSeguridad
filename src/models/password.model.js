import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Password", passwordSchema);