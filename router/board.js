const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check_auth')
const {
    boards_delete_all,
    boards_delete_board,
    boards_get_all,
    boards_post_board,
    boards_get_board,
    boards_update_board
} = require('../controller/board')

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === image/jpeg || file.mimetype === image/png){
        cb(null, true)
    } 
    else{
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    limit : {
        filesize : 1024*1024*5
    },
    fileFilter : fileFilter
})

// total get board
router.get('/', boards_get_all)

// detail get board
router.get('/:boardId', checkAuth, boards_get_board)

// register board
router.post('/', checkAuth, upload.single('boardImage'), boards_post_board)

// update board
router.put('/:boardId', checkAuth, boards_update_board)

// total delete board
router.delete('/', boards_delete_all)

// detail delete board 
router.delete('/:boardId', checkAuth, boards_delete_board)

module.exports = router