import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const signUserToken = async (payload) => {
    const { id, email, role } = payload;
    return JWT.sign({ id, email, role }, SECRET, {expiresIn: '15d'});
};

const verifyUserToken = async (token) => {
    return JWT.verify(token, SECRET);
};

const signAdminToken = async (payload) => {
    return JWT.sign({payload}, SECRET, {expiresIn: '15d'})
}

export default { signUserToken, verifyUserToken, signAdminToken}