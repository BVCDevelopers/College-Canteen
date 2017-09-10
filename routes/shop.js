const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    res.redirect("/");
});

module.exports = router;