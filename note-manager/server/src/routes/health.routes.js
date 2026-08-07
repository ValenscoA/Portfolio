import { Router } from 'express'

const router = Router()

router.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'Note Manager API is running',
  })
})

export default router
