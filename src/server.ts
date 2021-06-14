
import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';


import validarRouter from './app/routes/validar.routes'

class Server {
    public app: express.Application;

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config =  () => {

        this.app.set('port', process.env.PORT || 3001)

                // middlewares
                this.app.use(morgan('dev'))
                // this.app.use(helmet())
                this.app.use(express.json())
                this.app.use(express.urlencoded({extended:false}))
                this.app.use(compression())
                this.app.use(cors())
    }
    routes = () => {
        
        this.app.use('/api/validar', validarRouter)
        this.app.use('/api/enviarcorreo', validarRouter)
        this.app.use('/', (req, res) => res.send('Hola 👻🤓🧐 la APi: /api/'))
    }

    start = () => {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server en puerto',this.app.get('port'))
        })
    }

}

const server = new Server()

server.start()

