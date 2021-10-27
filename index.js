import path from 'path'
const __dirname = path.resolve()
const dist = path.join(__dirname, 'dist')

import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
import { port } from './config/environment.js'
import dotenv from 'dotenv'
dotenv.config()

// This is a simple app connector to use Node and Webpack to start a server and connect it to the API routes. 

const app = express()

async function startServer() {
  app.use(express.json())
  app.use(logger)
  app.use('/api', router)
  app.use(errorHandler)
  app.use('/', express.static(dist))
  app.get('*', function(req, res) {
    res.sendFile(path.join(dist, 'index.html'))
  })
  app.listen(port, () => console.log(`Up and Running on Port ${port}`))
}

startServer()

export default app
