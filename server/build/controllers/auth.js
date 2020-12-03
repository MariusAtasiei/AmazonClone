"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.resetPassword = exports.forgotPassword = exports.confirm = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const user = yield user_1.default.create(body);
        const { _id } = user;
        const { username, email } = body;
        const token = `${_id}&${user.encryptPassword(_id.toString())}`;
        const url = `${process.env.CLIENT_URL}/confirmation/${token}`;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_KEY },
        });
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to: email,
            subject: "Amazon Fake Clone | Confirm Account",
            text: `Hello, ${username}! \nPlease confirm your account by clicking the link below: \n${url}`,
        };
        transporter.sendMail(mailOptions, function (err) {
            if (err)
                throw err;
        });
        return res.json({ user: { username, email, _id } });
    }
    catch ({ message }) {
        return res.json({ error: message });
    }
});
exports.signIn = (req, res) => {
    const { email, password } = req.body;
    const findUser = user_1.default.findOne({ email }).select("-__v  -createdAt -updatedAt");
    findUser.exec((err, user) => {
        if (err)
            return res.json({ error: err.message });
        else if (!user)
            return res.json({ error: "User not found" });
        else if (!user.authenticate(password))
            return res.json({ error: "Email and password don't match" });
        const { username, _id } = user;
        return res.json({ user: { username, email, _id } });
    });
};
exports.confirm = (req, res) => {
    const [id, token] = req.params.key.split("&");
    const userFind = user_1.default.findById(id);
    userFind.exec((err, user) => {
        if (err) {
            return res.json({ error: "Invalid email" });
        }
        else if (!user) {
            return res.json({ error: "User not found" });
        }
        else if (user.confirmed) {
            return res.json({ message: "Account already confirmed" });
        }
        const message = user.confirm(token);
        user.save();
        return res.json({ message });
    });
};
exports.forgotPassword = (req, res) => {
    const email = req.params.key;
    try {
        const findUser = user_1.default.findOne({ email });
        findUser.exec((err, user) => {
            if (err) {
                return res.json({ error: "Invalid email" });
            }
            else if (!user) {
                return res.json({ error: "User not found" });
            }
            const token = `${user._id}&${user.encryptPassword(user._id.toString())}`;
            const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_KEY },
            });
            const mailOptions = {
                from: process.env.GMAIL_ID,
                to: email,
                subject: "Amazon Fake Clone | Reset Password",
                text: `Hello, ${user.username}! \nTo reset your actual password, please click the link below: \n${url}`,
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err)
                    throw new Error("The email could not be sent");
            });
            return res.json({ message: "Mail sent. Please check your email." });
        });
    }
    catch ({ message }) {
        return res.json({ error: message });
    }
};
exports.resetPassword = (req, res) => {
    const [id, token] = req.params.key.split("&");
    const { password } = req.body;
    const findUser = user_1.default.findById(id);
    findUser.exec((err, user) => {
        if (err)
            return res.json({ message: "Invalid link" });
        else if (!user)
            return res.json({ message: "Invalid link" });
        const confirm = user.confirm(token);
        if (!confirm.includes("successfully"))
            return res.json({ message: "Invalid link" });
        user.password = password;
        user.save();
        return res.json({ message: "Password changed successfully" });
    });
};
exports.validateResetPassword = (req, res) => {
    const [id, token] = req.params.key.split("&");
    const findUser = user_1.default.findById(id);
    findUser.exec((err, user) => {
        if (err)
            return res.json(false);
        else if (!user)
            return res.json(false);
        const confirm = user.confirm(token);
        if (!confirm.includes("successfully"))
            return res.json(false);
        return res.json(true);
    });
};
//# sourceMappingURL=auth.js.map