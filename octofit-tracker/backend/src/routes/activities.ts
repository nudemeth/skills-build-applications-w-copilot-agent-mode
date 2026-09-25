import { Router } from 'express'
import { Activity } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  const activities = await Activity.find().lean()
  response.json(activities)
})

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body)
  response.status(201).json(activity)
})

router.get('/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id)

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json(activity)
})

router.put('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json(activity)
})

router.delete('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id)

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json(activity)
})

export default router
