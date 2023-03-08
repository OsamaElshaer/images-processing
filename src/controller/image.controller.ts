import { Request, Response } from 'express'
import { isImeageExist } from '../utilities/image.utility'
import { validationResult } from 'express-validator'

const resizeController = async (req: Request, res: Response) => {
    const width = parseInt(req.query['width'] as string)
    const height = parseInt(req.query['height'] as string)
    const filename = req.query['filename'] as string

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
    try {
        await isImeageExist(width, height, filename)
        res.render('index', {
            thumbnail: `${filename}_${width}_${height}.jpg`,
        })
    } catch (error: unknown) {
        throw new Error("can't  resize image")
    }
}

export default resizeController
