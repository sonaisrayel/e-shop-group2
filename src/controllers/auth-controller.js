import { User } from '../models/user-model';

import CryptoLib from '../libs/crypto-lib';
import JWTLib from '../libs/jwt-lib';

export const registration = async (req, res) => {
    try {
        const {
            name, 
            surname, 
            username, 
            password, 
            repeatPassword, 
            email, 
            userType } = req.body;

        if (password !== repeatPassword){
            throw new Error("Passwords doesn't match!")
        };

        const passwordHash = await CryptoLib.makeHash(password);

        const newUser = new User({
            name, surname, username, password:passwordHash, email, userType
        });

        await newUser.save();

        const user = await User.findOne({username:newUser.username}).select(-'password');

        res.status(201).send({data: user});
    } catch (e) {
        res.status(404).send({message: "Failed to registrate!"})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userInfo = await User.find({email});

        const [userParams] = userInfo;

        const user = await CryptoLib.compare(password, userParams);

        if(!user){
            throw new Error("You are not registered!")
        }

        const token = await JWTLib.signUserToken({id: userParams.id, email: userParams.email})

        res.status(201).send({data: {username: userParams.username, email: userParams.email}, token})

    } catch (e) {
        res.status(404).send({message: "Failed to login!"})
    }
}
