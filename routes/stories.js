const express = require('express');
const router = express.Router();
const {loginAuth, guestCheck} = require('../middlewares/auth');
const {Story} = require('../models/Story');
const {User} = require('../models/User');

router.get('/',async (req, res) => {
    const stories = await Story.find({
        status: 'public',
    }).populate('user');
    res.render('stories/index',{
        stories
    });
});

router.get('/show/:id',async (req, res) => {

    let story = await Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser');

    res.render('stories/show',{
        story
    });
});

router.put('/:id', async (req, res) => {
    let story = await Story.findOneAndUpdate({_id: req.params.id},{
        $set: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            allowComments: (req.body.allowComments) ? true : false
        }
    },{new: true});

    res.redirect('/dashboard');

});

router.post('/comment/:id',async (req, res) => {
    let story = await Story.findOne({_id: req.params.id});
    if(story){
        const newComment = {
            commentBody: req.body.comment,
            commentUser: req.user.id
        };
        story.comments.unshift(newComment);
        await story.save();
        res.redirect(`/stories/show/${req.params.id}`)
    }
})

router.get('/add', loginAuth, (req, res) => {
   res.render('stories/add');
});

router.get('/user/:id', async (req, res) => {
    let stories = await Story.find({
        user: req.params.id
    });
    let user = await User.findOne({
        _id: req.params.id
    });
    res.render('profile',{stories, user});
})

router.get('/edit/:id', loginAuth,async (req, res) => {
    let story = await Story.findOne({
        _id: req.params.id
    });
    if(story){
        res.render('stories/edit',{story});
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: (req.body.allowComments) ? true : false,
        user: req.user.id
    };

    const story = new Story(newStory);
    await story.save();

    res.redirect(`/stories/show/${story.id}`);

});

router.delete('/delete/:id',async(req, res) => {
    let story = await Story.findOneAndDelete({_id: req.params.id});
    if(story){
        console.log(story);
        res.redirect('/dashboard');

    }
})

module.exports = router;