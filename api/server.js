const express = require('express');
const { logger } = require('./actions/actions-middlware')
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
// Configure your server here
server.use(express.json())
server.use(logger)
// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actionsRouter)
// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectsRouter)
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res) => {
    res.send(`<h2>Hi</h2>`)
})

module.exports = server;