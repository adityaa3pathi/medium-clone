import { Hono } from 'hono'
import { updatedBlogInput, createdBlogInput, } from '@the_adi/medium-common'
import {decode, sign, verify } from 'hono/jwt'
import{ PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Message } from '@mui/icons-material'

export const blogRouter = new Hono<{

        Bindings: {
            DATABASE_URL: string,
            JWT_SECRET: string
        },
        Variables: {
            userId: string
        }

}>()


blogRouter.use("/*", async (c, next) => {

    try{
            const authHeader = c.req.header("authorization") || "";


            const token = authHeader.split( ' ')[1];
            if(!token) {
                c.status(401);
                return c.json({message: "token is missing"});
            }

            const user = await verify(token, c.env.JWT_SECRET);

            if(user) {
                c.set('userId', (user as { id: string}).id);
                await next();
            }


            else{
                c.status(401);
                return c.json({
                    message: "you are not logged in"
                })
            }

        }
        catch(e){
            c.status(401);
            return c.json({message: "authentication fAILEd"})
        }
    });


blogRouter.post('/post', async (c) => {
    try {
        const body = await c.req.json();

        const {success} = createdBlogInput.safeParse(body);
    
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const authorId = c.get("userId");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
    
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        
        return c.json({id: post.id
    
        })
    }

    catch(e) {
        console.error();
    }
   
  })
  blogRouter.put('/update', async(c) => {

    const body = await c.req.json();
    const parseResult = updatedBlogInput.safeParse(body);

    if (!parseResult.success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct",
            errors: parseResult.error.errors
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id: number = Number(body.id);

try{
    const post = await prisma.post.update({
        where: {
           id: id
        },
        data: {
            title: body.title,
            content: body.content,
           
        }
    })
    
    return c.json({id: post.id})
}
catch(e) {
    console.log(e)

    return c.json({
        message: "some error is there"
    })
}
  })
  //f

  //add pagination here
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        posts
    })
})
  blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    

try {
    const post = await prisma.post.findFirst({
        where: {
            id: Number(id)
        }, 
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: 
                {
                    name: true
                }
            }
        }
    })
       return c.json({
        post
       
    })
    }
catch(e) {
    c.status(411);
    console.log(e);
    return c.json({
        message: "error while fetching blog post"
    })
}

    return c.text('getting a blog route')
  
  
  
  })
blogRouter.post('/test', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
return c.json(
    {message: "test route"

})

}
)
