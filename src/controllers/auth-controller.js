import { User } from '../models/user-model';

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

        const newUser = new User({
            name, surname, username, password, email, userType
        });

        await newUser.save();

        const user = await User.findOne({username:newUser.username}).select(-'password');

        res.status(201).send({data: user});
    } catch (e) {
        res.status(404).send({message: e.message})
    }
}
