import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const signUserToken = async (payload) => {
    const { id, email, username, role } = payload;
    return JWT.sign({ id, email, username, role }, SECRET, {expiresIn: '15d'});
};

const verifyUserToken = async (token) => {
    return JWT.verify(token, SECRET);
};

export default { signUserToken, verifyUserToken }