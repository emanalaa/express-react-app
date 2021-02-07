import { Router } from 'express';
import * as path from 'path';
import * as reportsService from "../Services/report-generator";

const reportRouter = Router();

reportsService.UpdateDataLists();

export async function averageListing(req, res) {
    return res.json(reportsService.averageListing());
}

export async function distributions(req, res) {
    return res.json(reportsService.percentualDistribution());
}

export async function Averge30TopContacted(req, res) {
    return res.json(reportsService.Averge30TopContacted());
}

export async function top5PerMonth(req, res) {
    return res.json(reportsService.top5PerMonth());
}

export async function UploadCsvFile(req, res, fileupload) {
    try {
        let uploadFile = req.files.file;
        const fileName = req.files.file.name;
        const filepath = path.resolve('./public/files/', fileName);
        uploadFile.mv(filepath);
        reportsService.UpdateDataLists();
        res.send("File uploaded succesfully");
    }
    catch
    {
        res.send("An error occurred while uploading file, please try again!");
    }
}
export default reportRouter;
