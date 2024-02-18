import jwt from 'jsonwebtoken';

const  generateToken = userId => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return accessToken
}

export { generateToken }