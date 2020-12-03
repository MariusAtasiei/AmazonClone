"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuidv1_1 = __importDefault(require("uuidv1"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    salt: String,
}, { timestamps: true });
userSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = uuidv1_1.default();
    this.hashedPassword = this.encryptPassword(password);
});
userSchema.methods = {
    encryptPassword: function (password) {
        if (!password)
            return "";
        try {
            return crypto_1.default.createHmac("sha1", this.salt).update(password).digest("hex");
        }
        catch (err) {
            return "";
        }
    },
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashedPassword;
    },
    confirm: function (token) {
        if (token !== this.encryptPassword(this._id.toString()))
            return "Invalid link";
        this.confirmed = true;
        return "Email confirmed successfully";
    },
};
exports.default = mongoose_1.model("User", userSchema);
//# sourceMappingURL=user.js.map