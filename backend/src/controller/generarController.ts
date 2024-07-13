import { Request, Response } from 'express';
import { query } from '../db';
import jwt from "jsonwebtoken";

type ResponseSection = | { token: string, profile: number } | { message: string };

export const validateToken = async (req: Request, res: Response<ResponseSection>) => {
    const authorization = req.get("Authorization");
    let token = "";
  
    try {
        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
            token = authorization.substring(7);
        }
    
        if (!token) return res.status(401).json({ message: 'Autentificación Invalida' });
    
        const { usuid, correo } = jwt.verify(token, process.env.JWT_SECRET) as { usuid: null, correo: '' };

        if (!usuid || !correo) return res.status(401).json({ message: 'Autentificación Invalida' });
    
        const {rows} = await query(`SELECT usu_perfil perfil FROM usuarios WHERE usu_id = $1 AND usu_correo = $2 AND est_id = 1 LIMIT 1`, [usuid, correo]);

        if (!(rows.length > 0)) return res.status(401).json({ message: 'Autentificación Invalida' });    

        res.status(200).json({ token, profile: rows[0].perfil });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en base de datos al verificar autentificación' });
    }
};