export const { NODE_ENV = 'development', APP_PORT = 4000 } = process.env

export const IS_PROD = NODE_ENV === 'production'
