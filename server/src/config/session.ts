import { SessionOptions } from 'express-session'
import { IS_PROD } from './app'

const ONE_HOUR = 1000 * 60 * 60
const HALF_HOUR = ONE_HOUR / 2
const SIX_HOURS = ONE_HOUR * 6

export const {
  SESSION_SECRET = 'DGt8fHqMocpR2Rr6hxysAMu9WZ3nb5DejF8ywxcBzPbDxLg6WdfaL4aZg3G4K6d4',
  SESSION_NAME = 'sid',
  SESSION_LIFETIME = HALF_HOUR
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_LIFETIME,
    secure: IS_PROD,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}
