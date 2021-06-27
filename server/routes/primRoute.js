import { Router } from "express";
import IndexCtrl from "../controllers/indexCtrl";

const router = Router();
router.post("/upload", IndexCtrl.primCtrl.createFileType);
router.get('/', IndexCtrl.primCtrl.findAll);
router.get('/:id', IndexCtrl.primCtrl.findOne);
router.delete('/:id', IndexCtrl.primCtrl.remove);

router.post('/createphoto/:id', IndexCtrl.primCtrl.createImage,
                                IndexCtrl.primCtrl.create,
                                IndexCtrl.productsCtrl.check);

export default router;
