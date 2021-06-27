import { Router } from 'express';
import IndexCtrl from '../controllers/indexCtrl'

const router = Router();
router.get('/', IndexCtrl.usersCtrl.requireSignin, IndexCtrl.usersCtrl.findAll);
router.post('/signup', IndexCtrl.usersCtrl.signup);
router.post('/signin', IndexCtrl.usersCtrl.signin);
router.get('/signout', IndexCtrl.usersCtrl.signout);


export default router;