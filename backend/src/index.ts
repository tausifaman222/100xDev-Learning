import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<
  { //typsript binding
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>()


app.get('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text('This is the Home Route')
})


app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;

//postgresql://tausifaman222:a4pnPOD3glqG@ep-blue-tree-a19f2g8p-pooler.ap-southeast-1.aws.neon.tech/neonDB?sslmode=require
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMWNmNzM5YTgtNDZhYy00MWEwLWE5ZmEtMDA2MDkxZTFmMGU3IiwidGVuYW50X2lkIjoiZGFjOTAzNTFmZDJkZjE1MzViNjkwZDc5ZWYyYWRkYmEyYWE1NjBkODM3YTI4ODg4ODVmMDI2Y2Y4YTEzMjkzMyIsImludGVybmFsX3NlY3JldCI6IjQ2NjNlYmM3LTgzZTAtNGJiMy04MjY0LTNmYmI4MDZhNWI0MiJ9.lYixp_Htw77tlhaY9Qr-jDsBO3FYt66AVYsTHAh631k"
