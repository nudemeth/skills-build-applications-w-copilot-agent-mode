import { Router } from 'express'
import { Team } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  const teams = await Team.find().lean()
  response.json(teams)
})

router.post('/', async (request, response) => {
  const team = await Team.create(request.body)
  response.status(201).json(team)
})

router.get('/:id', async (request, response) => {
  const team = await Team.findById(request.params.id)

  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json(team)
})

router.put('/:id', async (request, response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json(team)
})

router.delete('/:id', async (request, response) => {
  const team = await Team.findByIdAndDelete(request.params.id)

  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json(team)
})

export default router
