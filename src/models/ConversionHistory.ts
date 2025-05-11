import mongoose from "mongoose";

const ConversionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    crypto: { type: String, required: true },
    amount: { type: Number, required: true },
    resultUSD: { type: Number, required: true },
    resultBRL: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const ConversionHistory =
  mongoose.models.ConversionHistory ||
  mongoose.model("ConversionHistory", ConversionHistorySchema);

export default ConversionHistory;
