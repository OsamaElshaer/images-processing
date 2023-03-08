import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    const fullPath = path.join(
        __dirname,
        '..',
        '..',
        'images',
        'full',
        `${filename}.jpg `
    )
    const thumbPath = path.join(
        __dirname,
        '..',
        '..',
        'images',
        'thumb',
        `${filename}_${width}_${height}.jpg`
    )

    try {
        await sharp(fullPath)
            .resize(Number(width), Number(height))
            .toFile(thumbPath)
    } catch (error) {
        throw new Error("can't resize image")
    }
}

const isImeageExist = async (
    width: number,
    height: number,
    filename: string
): Promise<void> => {
    const outputImagePath = path.join(
        __dirname,
        '..',
        '..',
        'images',
        'thumb',
        `${filename}_${width}_${height}.jpg`
    )
    try {
        fs.exists(outputImagePath, async (isExist: unknown) => {
            if (isExist) {
                console.log('exists:', outputImagePath)
            } else {
                await resizeImage(filename, width, height)
            }
        })
    } catch (err) {
        console.error(err)
    }
}

export { isImeageExist, resizeImage }
