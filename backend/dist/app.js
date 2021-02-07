"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors = require('cors');
const app = express_1.default();
const fileupload = require("express-fileupload");
app.use(fileupload());
app.use(cors());
app.options('*', cors());
app.use(express_1.default.json());
app.use(routes_1.default);
const port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
//# sourceMappingURL=app.js.map