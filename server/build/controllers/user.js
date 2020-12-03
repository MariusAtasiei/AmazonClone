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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUser = exports.getOrders = exports.createOrder = exports.payment = void 0;
const order_1 = __importDefault(require("../models/order"));
const stripe = require("stripe")(process.env.STRIPE_KEY);
exports.payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { total } = req.query;
    try {
        const { client_secret } = yield stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });
        return res.json({ clientSecret: client_secret });
    }
    catch ({ message }) {
        return res.json({ error: message });
    }
});
exports.createOrder = (req, res) => {
    const { body } = req;
    try {
        const newOrder = order_1.default.create(body);
        return res.json({ order: newOrder });
    }
    catch ({ message }) {
        return res.json({ error: message });
    }
};
exports.getOrders = (req, res) => {
    const _a = req.query, { fields } = _a, filters = __rest(_a, ["fields"]);
    const findOrders = order_1.default.find(filters).select(fields);
    findOrders.exec((err, orders) => {
        if (err) {
            return res.json({ error: err.message });
        }
        else if (!orders) {
            return res.json({ error: "No orders" });
        }
        return res.json({ orders });
    });
};
exports.getOrdersByUser = (req, res) => {
    const { userId } = req.params;
    const findOrders = order_1.default.find({ userId }).select("-__v");
    findOrders.exec((err, orders) => {
        if (err)
            return res.json({ error: err.message });
        else if (!orders.length)
            return res.json({ error: "No orders found" });
        return res.json({ orders });
    });
};
//# sourceMappingURL=user.js.map