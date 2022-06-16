import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define('User', {
    full_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default User;