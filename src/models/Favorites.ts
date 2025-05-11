import mongoose from "mongoose";

const FavoriteCoinSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    coinId: {
      type: String,
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
    coinSymbol: {
      type: String,
      required: true,
    },
    coinImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FavoriteCoin =
  mongoose.models.FavoriteCoin ||
  mongoose.model("FavoriteCoin", FavoriteCoinSchema);

export default FavoriteCoin;
