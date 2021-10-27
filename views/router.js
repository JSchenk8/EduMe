import express from 'express'
import typeWord from '../controllers/textController.js'

// Not much of a router needed, with only one Route. But it's expandable if required.

const router = express.Router()

router.route('/text')
  .post(typeWord)


export default router