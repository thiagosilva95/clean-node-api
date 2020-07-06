import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middeware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
