import { Router } from 'express'
import { checkLoggedIn } from '../auth'
import { BadRequest } from '../errors'
import { auth, catchAsync } from '../middleware'
import prisma from '../prisma'

const router = Router()

router.get(
  '/me',
  auth,
  catchAsync(async (req, res) => {
    checkLoggedIn(req)
    const user = await prisma.user.findUnique({
      where: { id: req.session!.userId }
    })
    res.json(user)
  })
)

export default router
