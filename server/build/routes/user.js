"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.get("/payment", user_1.payment);
router.route("/order").post(user_1.createOrder).get(user_1.getOrders);
router.get("/orders/:userId", user_1.getOrdersByUser);
exports.default = router;
//# sourceMappingURL=user.js.map