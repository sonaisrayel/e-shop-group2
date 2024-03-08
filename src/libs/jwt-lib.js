import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const signUserToken = async (payload) => {
    const { id, email } = payload;
    return JWT.sign({ id, email }, SECRET, {expiresIn: '15m'});
};

const verifyUserToken = async (token) => {
    return JWT.verify(token, SECRET);
};

export default { signUserToken, verifyUserToken }