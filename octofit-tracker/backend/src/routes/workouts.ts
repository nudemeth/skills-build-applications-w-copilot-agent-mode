import { Router } from 'express'
import { Workout } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().lean()
  response.json(workouts)
})

router.post('/', async (request, response) => {
  const workout = await Workout.create(request.body)
  response.status(201).json(workout)
})

router.get('/:id', async (request, response) => {
  const workout = await Workout.findById(request.params.id)

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json(workout)
})

router.put('/:id', async (request, response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json(workout)
})

router.delete('/:id', async (request, response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id)

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json(workout)
})

export default router
