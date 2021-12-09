import { Router, Request, Response } from 'express'
import { hash, compare } from 'bcryptjs'
import { validate, loginSchema } from '../validation'
import { catchAsync, ensureGuest, auth } from '../middleware'
import { Unauthorized } from '../errors'
import { login, logout } from '../auth'
import prisma from '../prisma'

const router = Router()

router.post(
  '/login',
  ensureGuest,
  catchAsync(async (req: Request, res: Response) => {
    await validate(loginSchema, req.body)

    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !(await compare(password, user.password))) {
      throw new Unauthorized('Incorrect email or password')
    }

    login(req, user.id)

    res.json({
      id: user.id,
      email: user.email,
      name: user.name
    })
  })
)

router.post(
  '/logout',
  auth,
  catchAsync(async (req, res) => {
    await logout(req, res)

    res.json({ message: 'Logout OK!' })
  })
)

export default router
