import { model, Schema } from "mongoose"

const orderSchema = new Schema(
  {
    basket: { type: Object, required: true },
    userId: { type: String, default: "guest" },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
)

export default model("Order", orderSchema)
