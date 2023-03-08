import supertest from 'supertest'
import app from '../server'
import { resizeImage } from '../utilities/image.utility'
import path from 'path'
import fs from 'fs'

const request = supertest(app)
let isError: boolean

it('Get images/', async () => {
    const res = await request.get(
        '/images/?filename=fjord&width=200&height=200'
    )
    expect(res.status).toBe(200)
})

it('resize function should be succeed', async (): Promise<void> => {
    await resizeImage('fjord', 200, 200)
    const thumbImagePath: string = path.resolve(__dirname, '../../images/thumb')
    try {
        fs.access(thumbImagePath, (err) => {
            if (!err) {
                isError = false
            }
            isError = true
        })
    } catch (err) {
        isError = true
    }
    expect(isError).toBeFalsy()
})

afterAll(async (): Promise<void> => {
    const thumbImagePath: string = path.join(
        __dirname,
        '..',
        '..',
        'images',
        'thumb',
        'fjord_thumb.jpg'
    )
    try {
        fs.unlink(thumbImagePath, (err) => {
            throw err
        })
    } catch (err) {
        console.log(err)
    }
})
