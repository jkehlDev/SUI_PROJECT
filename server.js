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

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Main app module. Configure Express HTTPS web server.
 */
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({
    extended: true
}));

const helmet = require('helmet');
app.use(helmet());

const session = require('express-session');
const randomString = require('randomstring');
const secret = randomString.generate({
    length: 14,
    charset: 'alphanumeric'
});
app.use(session({
    secret,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: true,
        httpOnly: true,
        //  domain: 'example.com',
        //  path: 'foo/bar',
        maxAge: (1000 * 60 * 60)
    }
}));

app.use(express.static('public'));

// SET LOCALS
// GIVE ROOT PATH AND MESSAGE VAR FOR EJS INCLUDES
const path = require('path');
app.use((_, response, next) => {
   
    next();
})

// TABLE ROUTING
const midlleware_server = require('./app/middlewares/middleware_server');
const router_main = require('./app/routers/router_main');
app.use('/', midlleware_server.initilizeLocalsNdSession, router_main);

const router_user = require('./app/routers/router_user');
app.use('/user', midlleware_server.isSignInOrRedirect, router_user);

const router_admin = require('./app/routers/router_admin');
app.use('/admin', midlleware_server.isAdminOrRedirect, router_admin);

const router_error = require('./app/routers/router_error');
app.use('/error', router_error);

// PAGE NOT FOUND AFTER ALL
app.use(midlleware_server.redirect404);

// CREATE SERVER
const https = require('https');
const APP_PORT_HTTPS = process.env.PORT_HTTPS;
const fs = require('fs');
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(APP_PORT_HTTPS);

// REDIRECTION FROM HTTP TO HTTPS
const http = require('http');
const router_error = require('./app/routers/router_error');
const APP_PORT_HTTP = process.env.PORT_HTTP;
const redirectApp = express();
redirectApp.use((request, response, next) => {
    if (!request.secure) {
        return response.status(301).redirect('https://' + request.headers.host.replace(":" + APP_PORT_HTTP, ":" + APP_PORT_HTTPS) + "/");
    }
    return next();
});
const redirectServer = http.createServer(redirectApp);
redirectServer.listen(APP_PORT_HTTP);