const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');

router.get('/user', authenticateUser, function (req, res, next) {
    res.json(req.user);
});

router.get('/logout', authenticateUser, function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).json({ success: true });
});

module.exports = router;