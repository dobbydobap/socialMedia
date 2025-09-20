//register ( signup)
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    const { name, email, password, username} = req.body;
    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const exstingUSerEmail = await User.findOne({email});
    if(exstingUSerEmail){
        return res.status(400).json({message:"Email already in use"});
    }
    const exstingUsername = await User.findOne({username});
    if(exstingUsername){
        return res.status(400).json({message:"Username already in use"});
    }

    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt );
    console.log(salt);

    const newUser = await User.create({ name, email, password:hashedPassword, username })
    const token = await genToken(newUser._id)

    res.cookie("token", token, {    
        httpOnly:true,
        sameSite:'strict',
        maxAge: 30*42*60*60*1000
    });

    console.log(token)
    res.status(201).json(newUser._id);


}


//encryption( 2 way process) - when we just need to send some data in a protected way , even if the mallare gets the data they should not be able to read it
//decryipton( 2 way process) -  and when the data is received it can be converted back to the original data 
//hashing( one way process) - when we need to store some data in a protected way , even if the mallare gets the data they should not be able to read it
// our password is exposed and to avoid this we use hashing
// we have 4-5 hash algos ( it just converts the data into meaningless string)

//salting - adding some random string to the password before hashing it
// peppering - adding some secret string to the password before hashing it

//SIgnIn ( login)

export const SignIn = async (req, res) => {
    const { password, username} = req.body;
    console.log(req.body);

    if (! password || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password );
    console.log(isPasswordCorrect);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly: true,
        sameSite:'strict',
        maxAge: 30*24*60*60*1000

    });

    console.log(token)
    
    res.status(200).json(user)
}
