import express from 'express'
import SetupMiddleware from '@/main/config/middleware'

const app = express()
SetupMiddleware(app)

export default app
