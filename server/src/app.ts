import express from 'express'
import session, { Store } from 'express-session'
import cors from 'cors'
import { SESSION_OPTIONS } from './config'
import { register, login, home } from './routes'
import { serverError, notFound } from './middleware'

export const createApp = (store: Store) => {
  const app = express()
  // remove x-powered-by header from headers
  app.disable('x-powered-by')

  // allow cors
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  // json requests handling
  app.use(express.json())
  // session middleware
  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  )

  // home routes
  app.use(home)
  // login routes
  app.use(login)
  // register route
  app.use(register)
  // Not found error handling
  app.use(notFound)
  // Server errors handling
  app.use(serverError)

  return app
}
