import { Request, Response } from 'express'
import { SESSION_NAME } from './config'
import { BadRequest, Unauthorized } from './errors'
// import { User } from './models'

export const isLoggedIn = (req: Request) => !!req.session!.userId

export const checkLoggedIn = (req: Request) => {
  if (!isLoggedIn(req)) {
    throw new Error('You must be logged in!')
  }
}

export const checkLoggedOut = (req: Request) => {
  if (isLoggedIn(req)) {
    throw new BadRequest('You are already logged in!')
  }
}

export const checkExists = async (email: string) => {
  // const userExists = await User.exists({ email })
  const userExists = false
  if (userExists) {
    throw new BadRequest('Invalid email')
  }
}

export const attemptLogIn = async (req: Request, args: any) => {
  const { email, password } = args
  // const user = await User.findOne({ email })
  const user = {
    id: 123456
  }

  if (
    !user 
    // || !(await user.matchesPassword(password))
    ) {
    throw new Unauthorized('Incorrect email or password')
  }
  login(req, user.id)
  return user
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
