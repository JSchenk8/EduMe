import express from 'express'
import typeWord from '../controllers/textController.js'

const router = express.Router()

router.route('/text')
  .post(typeWord)


export default router