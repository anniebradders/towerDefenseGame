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
  console.log(req.body);
  //const { user, key, value} = req.body;
  var user = req.body.user;
  var key = req.body.key;
  var units = JSON.parse(req.body.units);
  console.log(units);
  await gameModel.updateOne({ user }, { units : units});
  res.status(200).json({ message: 'saved successfully' });
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
        console.log(user.email)
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

/*router.get('/userdetails', (req, res) => {
  const { email } = req.body;

  const userdetails = {email};

  res.status(200).json({userdetails});

});*/


router.post('/token', (req, res) => {
  //console.log(req.body);
  const { email, refreshToken } = req.body;
  //console.log(tokenList);
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
    res.clearCookie('refreshJwt');
    res.clearCookie('jwt');
    res.clearCookie('email')
  }
  res.status(200).json({ message: 'logged out' });
});
module.exports = router;
router.route("/GETGET").get(function(req, res) {
  userModel.find({}, function(err, result) {
    for (var i=0; i<result.length; i++) {
      result[i].password = "nicetryhackerman";
  }
  console.log(result)
    if (err) {
      res.send(err);
    } else {
      res.send((result));
    }
  });
});
module.exports = router;

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


