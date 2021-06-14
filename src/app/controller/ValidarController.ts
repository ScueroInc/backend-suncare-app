import axios from 'axios';
import { Request, Response } from 'express'
import {JSDOM} from 'jsdom'

export class ValidarController {

    validarDermatologo = async (req: Request, res: Response): Promise<Response> => {
        let solicitud: Boolean = false;
        let data: Object = {};
        let consultarPor = req.body

        let url = `https://200.48.13.39/cmp/php/detallexmedico.php?id=${consultarPor.cmp}`
        let respuesta = await axios.get<any>(url)




        const dom = new JSDOM(respuesta.data)
        // console.log('--->', dom.)
        let cmp = dom.window.document.getElementsByTagName('td')[0].getElementsByTagName('center')[0].innerHTML
        let apellido = dom.window.document.getElementsByTagName('td')[1].innerHTML
        let nombre = dom.window.document.getElementsByTagName('td')[2].innerHTML
        data ={
            cmp:cmp,
            nombre:nombre,
            apellido:apellido,
        };
        console.log('Datos del api--->')
        
        console.log('cod--->', cmp)
        console.log('nom--->', nombre)
        console.log('ape--->',apellido )


        console.log('Datos por la cual preguntar--->')

        console.log('cod--->', consultarPor.cmp)
        console.log('nom--->', consultarPor.nombres)
        console.log('ape--->',consultarPor.apellidos )

        if(consultarPor.cmp != cmp) return res.json({"respuesta":solicitud, "data":data})
        if(consultarPor.nombres != nombre) return res.json({"respuesta":solicitud, "data":data})
        if(consultarPor.apellidos != apellido) return res.json({"respuesta":solicitud, "data":data})

        solicitud = true;
        return res.json({"respuesta":solicitud, "data":data})
    }
}