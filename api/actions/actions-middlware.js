// add middlewares here related to actions
const action = require('./actions-model')

function logger(req, res, next) {
    const date = new Date();
    console.log(`
      REQUEST METHOD: ${req.method}
      REQUEST URL: ${req.originalUrl}
      TIMESTAMP: ${date.toLocaleString()}
    `);
    next()
}



module.exports = {
    logger,
}