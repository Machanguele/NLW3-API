import {Router} from 'express';
import multer from 'multer';

import OrphanagesController from './controllers/orphanagesController';
import UploadsConfig from './config/upload';

const routes = Router();
const upload = multer(UploadsConfig);

routes.get('/orphanages/:id', OrphanagesController.show);
routes.get('/orphanages', OrphanagesController.index);
routes.post("/Orphanages", upload.array('images'), OrphanagesController.create );



export default routes;