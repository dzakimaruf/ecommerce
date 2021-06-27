import { Router } from 'express';
import IndexCtrl from '../controllers/indexCtrl'

const router = Router();
router.get('/', IndexCtrl.liteCtrl.findAll);
router.get('/:id', IndexCtrl.liteCtrl.findOne);
router.post('/cart/:id', IndexCtrl.usersCtrl.checkuser,
    IndexCtrl.productsCtrl.findOne,
    IndexCtrl.shopCtrl.findOne,
    IndexCtrl.shopCtrl.createc,
    IndexCtrl.liteCtrl.createlite);
router.post('/order', IndexCtrl.shopCtrl.checkCart,
    IndexCtrl.productsCtrl.findOne1,
    IndexCtrl.ordersCtrl.create,
    IndexCtrl.shopCtrl.update1,
    IndexCtrl.liteCtrl.update1)
router.get('/order/:id', IndexCtrl.ordersCtrl.findOne)
router.get('/findone/order', IndexCtrl.ordersCtrl.findAll)



export default router;