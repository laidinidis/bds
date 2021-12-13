import { Router } from 'express'
import { checkLoggedIn } from '../auth'
import { auth, catchAsync } from '../middleware'
import { findUser } from '../prisma/user'

const router = Router()

router.get(
  '/me',
  auth,
  catchAsync(async (req, res) => {
    checkLoggedIn(req)
    // it will throw if the user is not logged in
    // TODO: handle user not found
    const user = req.session?.userId && await findUser(req.session.userId)
    res.json(user)
  })
)

export default router
