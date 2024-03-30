import JWT from "jsonwebtoken";
const { SECRET } = process.env;

const signUserToken = async (payload) => {
  const { id, email, username, role } = payload;
  return JWT.sign({ id, email, username, role }, SECRET, { expiresIn: "15d" });
};

const verifyUserToken = async (token) => {
  return JWT.verify(token, SECRET);
};

const signAdminToken = async (payload) => {
  const { role, username } = payload;
  return JWT.sign({ role, username }, SECRET, { expiresIn: "15d" });
};

export default { signUserToken, verifyUserToken, signAdminToken };
