const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const tokenList = {};
const router = express.Router();
const userModel = require('../models/userModel');
const gameModel = require('../models/gameModel')
const mongoose = require('mongoose')

router.get('/status', (req, res, next) => {
  res.status(200).json({ status: 'ok' });
});

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.status(200).json({ message: 'signup successful' });
});
// creates new game model document for user on signup
router.post('/signup', function (req, res, next) {
  var posts = new gameModel({
    email : req.data.email
  })
  posts.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})
router.post('/submitbadge', async (req, res) => {
  //grabs data from badge submission request
  var data = JSON.parse(req.body.data);
  var user = data.user;
 
  // value is the linkedin link
  var value = data.value;
  //key is the units array key
  var key = data.key;
  //units is the units array
  var units = data.units;
 
  //string version of link
  var valtest = JSON.stringify(value);
  //checks that the submitted link is a linkedin post 
  //- as of yet there is no true verification of the contents of the page reached from the linkedin link, 
  //this could potentially be achieved using the Linkedin API, which would require Oauth2.
  if(valtest.includes("https://www.linkedin.com/feed/update") == true ){
    units[key] = 1;
    res.status(200).json({ message: 'Successful upload' });
  }
  else{units[key] = 0;
    res.status(200).json({ message: 'invalid link' });
  }

  //updates units array
  await gameModel.updateOne({ email: user }, { units : units});
  //adds linkedin link to documents
  await gameModel.updateOne({ email: user }, {'$push': {'links':  value}});

});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          email: user.email
        };
        const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
        const refreshToken = jwt.sign({ user: body }, 'top_secret_refresh', { expiresIn: 86400 });
        // store tokens in cookie
        res.cookie('email', body.email)
        res.cookie('jwt', token);
        res.cookie('refreshJwt', refreshToken);
        // store tokens in memory
        tokenList[refreshToken] = {
          token,
          refreshToken,
          email: user.email,
          _id: user._id
        };
        //Send back the token to the user
        return res.status(200).json({ token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


router.post('/token', (req, res) => {
  const { email, refreshToken } = req.body;
  if ((refreshToken in tokenList) && (tokenList[refreshToken].email === email)) {
    const body = { email, _id: tokenList[refreshToken]._id };
    const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 300 });
    // update jwt
    res.cookie('email', body.email);
    res.cookie('jwt', token);
    tokenList[refreshToken].token = token;
    res.status(200).json({ token, body });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.post('/logout', (req, res) => {
  if (req.cookies) {
    const refreshToken = req.cookies['refreshJwt'];
    if (refreshToken in tokenList) delete tokenList[refreshToken]
    //cleares cookies
    res.clearCookie('refreshJwt');
    res.clearCookie('jwt');
    res.clearCookie('email');
  }
  res.status(200).json({ message: 'logged out' });
});
module.exports = router;
// gets user data from database and sends it to frontend
router.route("/GETGET").get(function(req, res) {
  userModel.find({}, function(err, result) 
  {
      // removes all passwords from data before passing it to the client-side
    for (var i=0; i<result.length; i++) {
      result[i].password = "nicetryhackerman";
  }
    if (err) {
      res.send(err);
    } else {
      res.send((result));
    }
  });
});
module.exports = router;
// takes updated map data from phaser and saves it to database
router.post('/saveGame', async (req, res) => {
  const { email, mapLoad } = req.body;
  const mapData = JSON.parse(mapLoad);
  await gameModel.updateOne({ email }, { map: mapData });
  res.status(200).json({ message: 'saved successfully' });
});
//gets game data from data and serves it to phaser and the skilltree page
router.route("/getGame").get(function(req, res) {
  gameModel.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
module.exports = router;


