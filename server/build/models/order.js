"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    basket: { type: Object, required: true },
    userId: { type: String, default: "guest" },
    amount: { type: Number, required: true },
}, { timestamps: true });
exports.default = mongoose_1.model("Order", orderSchema);
//# sourceMappingURL=order.js.map