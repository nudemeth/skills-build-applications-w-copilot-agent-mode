import { Router } from 'express'
import { User } from '../models/index.js'

const router = Router()

router.get('/', async (_request, response) => {
  const users = await User.find().lean()
  response.json(users)
})

router.post('/', async (request, response) => {
  const user = await User.create(request.body)
  response.status(201).json(user)
})

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)

  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json(user)
})

router.put('/:id', async (request, response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json(user)
})

router.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id)

  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json(user)
})

export default router
