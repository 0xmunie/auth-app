import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    last_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        },
        set(value) {
            this.setDataValue('email', value.toLowerCase().trim());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8,
            notEmpty: true
        },
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }, 
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
            if (value) {
                const hash = bcrypt.hashSync(value, 5);
                return this.setDataValue('otp', hash);
            } else {
                return this.setDataValue('otp', null);
            }
        }
    }
}, {
    timestamps: true
});

User.prototype.validPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
}

User.prototype.validOtp = async function (otp) {
    return await bcrypt.compare(otp, this.otp)
}

export default User;