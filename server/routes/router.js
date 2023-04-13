import Router from 'express'
import InfoController from "../controllers/InfoController.js";

const router = new Router()

router.post('/info', InfoController.create)
router.get('/info', InfoController.getAll)

export default router;