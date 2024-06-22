import { Hono } from 'hono'
import {decode, sign, verify } from 'hono/jwt'
import{ PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './user';
import { blogRouter } from './blog';
import { cors } from 'hono/cors'

const app = new Hono<{

Bindings: {
  JWT_SECRET: string,
  DATABASE_URL: string
} 
}>();

app.use("/*", cors())
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
