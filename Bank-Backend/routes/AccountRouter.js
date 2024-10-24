const router=require('express').Router();

const AccountControl=require('../controllers/AccountControl');

router.post('/account_register',AccountControl.account_register);
router.get('/profile',AccountControl.profile);
router.post('/deposit',AccountControl.deposit);
router.post('/withdraw',AccountControl.withdraw);

module.exports=router;