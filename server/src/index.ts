import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import {
  REDIS_OPTIONS,
  APP_PORT,
  IS_PROD,
} from './config'
import { createApp } from './app'
;(async () => {
  try {

    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({ client })

    const app = createApp(store)

    app.listen(APP_PORT, () => {
      console.log(`App listening http://localhost:${APP_PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
