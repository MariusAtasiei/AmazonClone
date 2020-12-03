"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
router.post("/signup", auth_1.signUp);
router.post("/signin", auth_1.signIn);
router.get("/confirmation/:key", auth_1.confirm);
router.route("/forgot/:key").get(auth_1.forgotPassword).post(auth_1.resetPassword);
router.route("/forgot-validate/:key").get(auth_1.validateResetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map