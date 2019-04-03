const router = require('express').Router(),
    userController = require('../controller/userController'),
    images = require('../helper/images'),
    autentic = require('../midleware/autentic'),
    autorize = require('../midleware/autorize')

router.get('/all', userController.all)
router.post('/register', userController.create)
router.post('/login', userController.login)
router.post('/sms', userController.sms)





module.exports = router