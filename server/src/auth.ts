import { Request, Response } from 'express'
import { SESSION_NAME } from './config'
import { BadRequest } from './errors'
import prisma from './prisma'

export const isLoggedIn = (req: Request) => !!req.session!.userId

export const checkLoggedIn = (req: Request) => {
  if (!isLoggedIn(req)) {
    throw new BadRequest('You must be logged in!')
  }
}

export const checkLoggedOut = (req: Request) => {
  if (isLoggedIn(req)) {
    throw new BadRequest('You are already logged in!')
  }
}

export const checkExists = async (email: string) => {
  const userExists = await prisma.user.count({
    where: { email }
  })

  if (userExists > 0) {
    // Probably this is a confusing message for the users
    // but we don't want to reveal that information, for security reasons, to a potential attacker
    throw new BadRequest('Invalid email')
  }
}

export const login = (req: Request, userId: number) => {
  req.session!.userId = userId
}

export const logout = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    // remove cookie from redis
    req.session!.destroy((e: Error) => {
      if (e) reject(e)

      // remove cookie from header
      res.clearCookie(SESSION_NAME)

      resolve(true)
    })
  })
