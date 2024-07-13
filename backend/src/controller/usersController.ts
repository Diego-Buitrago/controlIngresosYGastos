import { Request, Response } from 'express';
import { query } from '../db';
import jwt from "jsonwebtoken";
import { comparePassword } from '../utils/utils';

type ResponseSection = | { token: string, profile: number } | { message: string };

export const startSection = async (req: Request, res: Response<ResponseSection>) => {
    const { user, password } = req.body as { user: string, password: string };

    try {
        const { rows } = await query(`SELECT usu_id usuid, usu_clave clave, CONCAT(usu_nombre, ' ', COALESCE(usu_apellido, '')) nombre, usu_correo correo, usu_perfil perfil FROM usuarios WHERE (usu_correo = $1 OR usu_usuario = $2) AND est_id = 1 LIMIT 1`, [ user, user ]);
        
        // Si no se encuentra el usuario, devolver un mensaje de error
        if (rows.length === 0) return res.status(400).json({ message: "Correo electrónico o contraseña incorrectos" }); 

        // Verificar la contraseña
        const matchPassword = await comparePassword(password, rows[0].clave);   
        
        if (!matchPassword)  return res.status(400).json({ message: "Correo electrónico o contraseña incorrectos" }); 

        // Crear token JWT
        const { usuid, nombre, correo, perfil } = rows[0];
        const userToken = { usuid, nombre, correo };

      const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }); // expiresIn 24 HORAS 

      // Devolver información del usuario y token
      return res.status(200).json({ token, profile: perfil });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en base de datos' });
    }
};