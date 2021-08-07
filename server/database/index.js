/* eslint-disable no-console, no-unused-vars */
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');

const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { CLIENT_ID, CLIENT_SECRET, MONGO_PASS } = require('../config');

const mongoUri = 'mongodb://localhost:27017/Hash51';
const atlasUri = null;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connection Successful');
});

mongoose.connect(atlasUri || mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImage: String,
  source: String,
  coConspirators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evidence',
    },
  ],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

userSchema.plugin(passportLocalMongoose);

userSchema.plugin(findOrCreate);

// eslint-disable-next-line new-cap
const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

const localCallback = `http://${process.env.HOST}:${process.env.PORT}/auth/google/login`;

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: localCallback,
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, cb) => {
  User.findOrCreate(
    { googleId: profile.id },
    { username: profile.displayName,
      email: profile.emails[0].value,
      profileImage: profile.photos[0].value,
      source: profile.provider,
    }, (err, user) => cb(err, user),
  );
}));

module.exports = { User, mongoUri };
