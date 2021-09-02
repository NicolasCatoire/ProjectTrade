const express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = 5700

const app = express()

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.listen(port)
