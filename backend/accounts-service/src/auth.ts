import bcrypt from 'bcryptjs';

function hasPassword(password: string){
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hasPassword: string) {
    return bcrypt.compareSync(password, hasPassword);
}

export default {hasPassword, comparePassword}