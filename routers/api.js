const router = require('express').Router()

// Users DB -> User (model)

// Links DB -> Link (model)





const { registerUser, loginUser } = require('../controllers/user')
const { createShortLink } = require('../controllers/link')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/create-short-link', createShortLink)
// router.post('/to-short-link')
router.get('/get-user-links')
exports.router = router