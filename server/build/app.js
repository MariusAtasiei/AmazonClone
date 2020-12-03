"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(cors_1.default());
mongoose_1.default.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose_1.default.connection.once("open", () => console.log("Database connected"));
app.get("/check", (req, res) => res.send("SERVER IS RUNNING"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=app.js.map