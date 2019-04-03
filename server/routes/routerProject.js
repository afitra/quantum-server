const router = require('express').Router(),
    projectController = require('../controller/projectController')


router.get('/all', projectController.all)
router.post('/add', projectController.add)


module.exports = router