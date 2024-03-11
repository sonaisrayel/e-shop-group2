import bcrypt from 'bcrypt';

const compare = async (password, userParams) => {
    return await bcrypt.compare(password, userParams.password);
};

const makeHash = async (password) => {
    return await bcrypt.hash(password, 10);
};

export default { compare, makeHash };