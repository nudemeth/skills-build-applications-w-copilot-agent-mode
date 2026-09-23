import { Router } from 'express'
import { LeaderboardEntry } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean()
  response.json(leaderboard)
})

router.post('/', async (request, response) => {
  const entry = await LeaderboardEntry.create(request.body)
  response.status(201).json(entry)
})

router.get('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findById(request.params.id)

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json(entry)
})

router.put('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json(entry)
})

router.delete('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findByIdAndDelete(request.params.id)

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' })
    return
  }

  response.json(entry)
})

export default router
