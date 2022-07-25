const {Router} = require('express');

const router = Router();

const {usersGet,
    usersPost,
    usersPut,
    usersDelete} = require('../controllers/users.controller');


router.get('/',  usersGet)

router.post('/',  usersPost)

router.put('/:id',  usersPut)

router.delete('/',  usersDelete)

module.exports = router;