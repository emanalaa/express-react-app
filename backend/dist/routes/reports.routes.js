"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadCsvFile = exports.top5PerMonth = exports.Averge30TopContacted = exports.distributions = exports.averageListing = void 0;
const express_1 = require("express");
const path = __importStar(require("path"));
const reportsService = __importStar(require("../Services/report-generator"));
const reportRouter = express_1.Router();
function averageListing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(reportsService.averageListing());
    });
}
exports.averageListing = averageListing;
function distributions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(reportsService.percentualDistribution());
    });
}
exports.distributions = distributions;
function Averge30TopContacted(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(reportsService.Averge30TopContacted());
    });
}
exports.Averge30TopContacted = Averge30TopContacted;
function top5PerMonth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(reportsService.top5PerMonth());
    });
}
exports.top5PerMonth = top5PerMonth;
function UploadCsvFile(req, res, fileupload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let uploadFile = req.files.file;
            const fileName = req.files.file.name;
            const filepath = path.resolve('./public/files/', fileName);
            uploadFile.mv(filepath);
            res.send("File uploaded succesfully");
        }
        catch (_a) {
            res.send("An error occurred while uploading file, please try again!");
        }
    });
}
exports.UploadCsvFile = UploadCsvFile;
exports.default = reportRouter;
//# sourceMappingURL=reports.routes.js.map