import { Router } from 'express';
import * as reportsRouter from './reports.routes';

const routes = Router();

routes.get('/AverageListing', reportsRouter.averageListing);
routes.get('/distributions', reportsRouter.distributions);
routes.get('/top5PerMonth', reportsRouter.top5PerMonth);
routes.get('/Averge30TopContacted', reportsRouter.Averge30TopContacted);
routes.post('/UploadCsvFile', reportsRouter.UploadCsvFile);

export default routes;