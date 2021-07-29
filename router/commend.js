const express = require('express')
const router = express.Router()
const commendModel = require('../model/commend')
const {
    commends_delete_all,
    commends_delete_commend,
    commends_get_commend,
    commends_post_commend,
    commends_update_commend,
} = require('../controller/commend')

// detail get commend 
router.get('/:commendId', commends_get_commend)

// register commend
router.post('/', commends_post_commend)

// update commend
router.put('/:commendId', commends_update_commend)

// total delete commend
router.delete('/', commends_delete_all)

// detail delete commend
router.delete('/:commendId', commends_delete_commend)

module.exports = router