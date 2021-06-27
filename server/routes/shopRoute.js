import { Router } from 'express';
import IndexCtrl from '../controllers/indexCtrl'

const router = Router();

router.get('/:id', IndexCtrl.shopCtrl.findOne1);
router.delete('/:id', IndexCtrl.shopCtrl.remove);

export default router;