import { Router } from 'express'
import { hash, compare } from 'bcryptjs'

import { registerSchema, validate } from '../validation'
// import { User } from '../models'
import { login } from '../auth'
import { ensureGuest, catchAsync } from '../middleware'
import { BadRequest } from '../errors'
import prisma from '../prisma'
import { BCRYPT_WORK_FACTOR } from '../config'

const router = Router()

router.post(
  '/register',
  ensureGuest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body)

    const { email, name, password } = req.body

    const userExists = await prisma.user.count({
      where: { email }
    })

    if (userExists > 0) {
      throw new BadRequest('Invalid email')
    }

    const hashedPassword = await hash(password, BCRYPT_WORK_FACTOR)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    // login(req, user.id)

    return res.json({ message: 'register OK!' })
  })
)

export default router
