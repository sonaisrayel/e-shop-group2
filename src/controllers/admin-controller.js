import jwtLib from "../libs/jwt-lib.js";

export const adminLogin = async (req, res) => {
    try {
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const { username, password } = req.body;

        if(username !== adminUsername & password !== adminPassword){
            throw new Error("Access denied! You are not admin.")
        }
        const token = await jwtLib.signAdminToken({role:'admin', username: adminUsername})
        res.status(201).send({admin: {username: adminUsername}, token})
    } catch (e) {
        res.status(404).send({message: e.message})
    }
}