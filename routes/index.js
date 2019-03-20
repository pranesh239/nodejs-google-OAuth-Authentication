const express = require('express');
const router = express.Router();
const { loginAuth, guestCheck } = require('../middlewares/auth');
const { Story } = require('../models/Story');
router.get('/', guestCheck, (req, res) => {
    res.render('index');
});

router.get('/dashboard', loginAuth, async (req, res) => {
    let stories = await Story.find({
        user: req.user.id
    }).populate('user');
    res.render('dashboard',{
        stories
    });
});


module.exports = router;