import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';
import jwt from 'jsonwebtoken';
import { utils } from "../utils/utils";

// Asegúrate de cargar las variables de entorno al inicio del archivo
require('dotenv').config();

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            
            // Verificar que los datos no estén vacíos
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res
                    .status(400)
                    .json({ message: "Los campos son requeridos", code: 1 });
            }

            // Verificar usuario por email
            const lstUsers = await model.getuserByEmail(email);

            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

            // Verificar contraseña
            let result = utils.checkPassword(password, lstUsers[0].password);
            console.log("result",result)
            result.then((value) => {
                if (value) {
                    const newUser = {
                        email: lstUsers[0].email,
                        password: lstUsers[0].password,
                        role: lstUsers[0].role
                    };

                    console.log('SECRET:', process.env.SECRET);
                    let token = jwt.sign(newUser, process.env.SECRET, { expiresIn: '1h' });
                    return res.json({ message: "Autenticación correcta", token, code: 0 });
                } else {
                    return res.json({ message: "Password Incorrecto", code: 1 });
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ message: "Error en el servidor", code: 1 });
            });

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}

export const authController = new AuthController();