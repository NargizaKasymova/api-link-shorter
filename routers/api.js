const router = require('express').Router()

// Users DB -> User (model)

// Links DB -> Link (model)

router.post('/to-short-link')

router.get('/get-user-links')

const { registerUser, loginUser} = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)

exports.router = router