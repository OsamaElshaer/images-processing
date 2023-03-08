import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import imageRouter from './routes/image.routs'
import path from 'path'

dotenv.config()

const app: Application = express()

// static files
app.use('/images', express.static(path.join(__dirname, '..', 'images')))

//tempelet engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))

app.use('/images', imageRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>set parameters => /images/?filename=#&width=#&height=#</h1>')
})

const port = process.env.PORT
app.listen(port)

export default app
