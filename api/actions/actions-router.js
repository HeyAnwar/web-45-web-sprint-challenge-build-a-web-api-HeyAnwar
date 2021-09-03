// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

// router.get('/', async (req, res) => {
//     try {
//         const actions = await Actions.get()
//         res.json(actions)
//     }
//     catch (err) {
//         res.status(500).json({
//             message: '[]'
//         })
//     }
// })

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(err => {
      res.status(500).json({
          message: '[]',
          error: err.message,
      })
    })
  });

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const action = await Actions.get(id)
        if (!action) {
            res.status(404).json({
                message:'Specified ID does not exist'
            })
        } else {
            res.status(200).json(action)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid request'
        })
    }
})

router.post('/', async (req, res) => {
    const body = req.body
    if (!body.project_id || !body.description || !body.notes) {
        res.status(400).json({
            message: 'fill in required fields'
        })
    } else {
        try {
            const action = await Actions.insert(body)
            res.status(201).json(action)
        }
        catch (err) {
            res.status(500).json({
                message: 'Invalid request'
            })
        }
    }
})

// router.post('/actions', (req, res, next) => {
//     Actions.insert({ action: req.action })
//     .then(newAction => {
//         res.status(201).json(newAction)
//     })
//     .catch(next)
// })

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body

    if (!body.description && !body.notes) {
        res.status(400).json({
            message: 'fill in required fields'
        })
    } else {
        try {
            const action = await Actions.update(id, body)
            if (!action) {
                res.status(404).json({
                    message: 'action does not exist'
                })
            } else {
                res.status(200).json(action)
            }
        }
        catch (err) {
            res.status(500).json({
                message: 'Invalid request'
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const action = await Actions.remove(id)
        if (!action) {
            res.status(404).json({
                message: 'Invalid action'
            })
        } else {
            res.status(200).json(action)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid request'
        })
    }

})

module.exports = router