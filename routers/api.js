const router = require('express').Router()

// Users DB -> User (model)

// Links DB -> Link (model)





const { registerUser, loginUser } = require('../controllers/user')
const { createShortLink, getLinkId, getAllLinks, getAllLinksByOwnerId, deleteLinkById } = require('../controllers/link')
const { clickCounter } = require('../controllers/clickcounter')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/create-short-link', createShortLink)
// router.post('/to-short-link')
router.get('/get-user-links')
router.get('/shortlink/:shortId', getLinkId)
router.get('/my-links', getAllLinks )
router.get('/my-links/:userId', getAllLinksByOwnerId)
router.delete('/delete-by-id/:linkId', deleteLinkById)
router.get('/shortlink/:shortId/clickcount', clickCounter)

exports.router = router