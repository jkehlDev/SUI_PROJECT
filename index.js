/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

require('dotenv').config();
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

const session = require('express-session');
const secret = process.env.SESSPASSPHRASE;
app.use(session({
  secret,
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60) 
  }
}));

app.use(express.static('public'));

const router_index = require('./routers');
app.use(router_index);

//const midlleware_session = require('./middlewares/midlleware_session');
//app.use('/', midlleware_session.init, router_index);

const controller_error = require('./controllers/controller_error');
app.use(controller_error.error404);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
 