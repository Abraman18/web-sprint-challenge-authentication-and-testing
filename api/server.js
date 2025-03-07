const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

const sessionConfig = {
	name: 'mula',
	secret: 'shh',
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true
	},
	resave: false,
	saveUninitialized: true,

}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));


server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

module.exports = server;
