import { Router } from 'express';
import IndexCtrl from '../controllers/indexCtrl'

const router = Router();
router.post('/', IndexCtrl.productsCtrl.create);
router.get('/', IndexCtrl.productsCtrl.findAll);
router.get('/:id', IndexCtrl.productsCtrl.findOne2);
router.put('/:id', IndexCtrl.productsCtrl.update);
router.delete('/:id', IndexCtrl.productsCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.productsCtrl.rawSQL);
router.get('/search/products', IndexCtrl.productsCtrl.findAllSearch);

//router.post

// router.get('/photo/:filename', IndexCtrl.productsCtrl.photo,
// IndexCtrl.productsCtrl.defaultPhoto);


export default router;