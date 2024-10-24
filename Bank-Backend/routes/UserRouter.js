const router=require('express').Router();

const UserControl=require('../controllers/UserControl');

router.post('/login',UserControl.login);
router.post('/signup',UserControl.signup);

module.exports=router;