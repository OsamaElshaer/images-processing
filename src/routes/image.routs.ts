import Router from 'express'
import resizeController from '../controller/image.controller'
import queryValidation from '../middlewares/validation.middleware'

const router = Router()

router.get('/', queryValidation, resizeController)

export default router
