import { Router } from 'express'
import { ValidarController } from '../controller/ValidarController'
import { EnviarCorreoController } from '../controller/EnviarCorreoController'
// import { AdministradorController } from '../controllers/administradorController'

const controller: ValidarController = new ValidarController
const enviarcorreocontroller : EnviarCorreoController = new EnviarCorreoController
const router = Router()

router.post('/', controller.validarDermatologo)
router.post('/correo/', enviarcorreocontroller.enviarcorreo)
export default router