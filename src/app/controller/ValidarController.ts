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
        let derm="DERMATOLOGIA"
        let derm_ped="DERMATOLOGIA%20PEDIATRICA"

        let urlDerma=`https://200.48.13.39/cmp/php/listaxespecialidad.php?id=00013&key=17&des=${dermatologia},${dermatologiaPedriatica}`
        let lista = await axios.get<any>(urlDerma)

        const manageDom = new JSDOM(lista.data)
		
        const table = manageDom.window.document.querySelector('#simple-example-table')
        let aux = false
        while (!aux){
            let cmpValidar=  table?.getElementsByTagName("td")[counter]?.innerHTML
            console.log('validando',cmpValidar)
            if (cmpValidar==consultarPor.cmp){
                aux = true
            }
        }
        if(consultarPor.cmp != cmp) return res.json({"respuesta":solicitud, "data":data,"esDermatologo":true})
        if(consultarPor.nombres != nombre) return res.json({"respuesta":solicitud, "data":data,"esDermatologo":true})
        if(consultarPor.apellidos != apellido) return res.json({"respuesta":solicitud, "data":data,"esDermatologo":true})

        solicitud = true;
        return res.json({"respuesta":solicitud, "data":data,"esDermatologo":true})
    }
}