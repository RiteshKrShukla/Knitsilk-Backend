const express = require('express');
const router = express.Router();

let adminLoggedIn = false;

router.get('/check-login', (req, res) => {
    res.json({ isLoggedIn: adminLoggedIn });
});
router.post('/do-login', (req, res) => {
    adminLoggedIn = true;
    res.json({ isLoggedIn: adminLoggedIn });
});
router.post('/do-logout', (req, res) => {
    adminLoggedIn = false;
    res.json({ isLoggedIn: adminLoggedIn });
});



module.exports = router;