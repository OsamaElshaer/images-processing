import { query } from 'express-validator'

const queryValidation = [
    query('filename').exists().withMessage('filename must be exist'),

    query('width')
        .exists()
        .withMessage('Image width is required')
        .toInt()
        .isInt({ min: 1, max: 1000 })
        .withMessage('it should be number and max 1000'),
    query('height')
        .exists()
        .withMessage('Image height is required')
        .toInt()
        .isInt({ min: 1, max: 1000 })
        .withMessage('Tit should be number and max 1000'),
]

export default queryValidation
