import { Request,Response } from "express";
import User from "../models/user";

export const getUsuarios = async(req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({users});
}

export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if( user ){
        res.json(user);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postUsuario = async(req: Request, res: Response) => {

    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if( existEmail ){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el mail ' + body.email
            });
        }



        const user = new User( body );
        await user.save();

        res.json( user );
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );
        if( !user ){
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        await user.update( body );

        res.json(user);
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if( !user ){
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        })
    }

    // Eliminacion fisica
    // await user.destroy();

    await user.update({ estado: false });

    res.json(user)
}