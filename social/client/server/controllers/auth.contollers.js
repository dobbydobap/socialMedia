//register ( signup)
import User from "../models/user.model.js";


export const signUp = async (req, res) => {
    const { name, email, password, username} = req.body;
    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const exstingUSerEmail = await User.findOne({email});
    if(exstingUSerEmail){
        return res.status(400).json({message:"Email already in use"});
    }
    const exstingUSerUsername = await User.findOne({username});
    if(exstingUSerUsername){
        return res.status(400).json({message:"Username already in use"});
    }


    await User.create({ name, email, password, username })
    res.status(201).json({ message: "User created successfully" });
}