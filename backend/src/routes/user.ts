import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from 'hono/jwt'
import z from "zod";
import { signupInput, signinInput } from "@the_adi/medium-common";


export const userRouter = new Hono<{
     Bindings:  {
     DATABASE_URL:  string,
     JWT_SECRET: string
        } 
}>()


userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  const {success} = signupInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({
      message: "inputs are not correct"
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      }
    })  
  
  
  const token = await sign({id: user.id}, c.env.JWT_SECRET)
  
  return c.json({
    jwt: token
  })
  }
  
  catch(e) {
    c.status(411);
    return c.text('likely the user is already present with this email')
    
  }
  return c.text('Signup Route')
  })
  userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();

    const {success} = signinInput.safeParse(body);
    try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
  
    if(!user) {
      c.status(403);
      return c.json({ error: "user not found"});
    }
  
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.text(jwt)
  }
  
  catch(e) {
    console.log(e);
    c.status(411);
    return c.text("invalid")
  }
  })
  