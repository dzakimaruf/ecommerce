import { Router } from 'express';
import IndexCtrl from '../controllers/indexCtrl'

const router = Router();
router.post('/file', IndexCtrl.uploadCtrl.uploadMultipart,
                     IndexCtrl.primCtrl.create, 
                     IndexCtrl.primCtrl.findAll);
router.get('/:filename', IndexCtrl.uploadCtrl.download,
                         IndexCtrl.uploadCtrl.photo);
 

export default router;