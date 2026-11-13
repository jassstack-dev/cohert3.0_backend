const express = require('express')
const { noteCreateController, getNoteController, updateNoteController, readNoteConntroller, deleteNoteController } = require('../controllers/note.controller')

const router = express.Router()

router.post('/create', noteCreateController)
router.get('/get', getNoteController)
router.put('/:id', updateNoteController)
router.get('/:id', readNoteConntroller)
router.delete('/:id', deleteNoteController)
module.exports = router