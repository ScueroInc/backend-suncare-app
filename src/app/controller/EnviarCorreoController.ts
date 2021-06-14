var  nodemailer =  require("nodemailer");
import { Request, Response } from 'express'

export class EnviarCorreoController {
    
    enviarcorreo = async (req: Request, res: Response): Promise<Response> =>{
        let objmensaje  = req.body
        
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            user: 'app.suncare@gmail.com', 
            pass: 'fpwprwsxcuqsusxy',
            },
        });

        await transporter.sendMail({
            from: '"Equipo de Gestión de accesos de SunCare" <app.suncare@gmail.com>', 
            to: objmensaje.correo, 
            subject: objmensaje.asunto, 
            html: objmensaje.mensaje, // html body
        });
        
        return res.json({"response": objmensaje.correo, "mensaje": objmensaje.mensaje, "enviado": true});
    }
}