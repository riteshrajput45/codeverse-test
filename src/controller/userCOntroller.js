const User = require('../model/userModel')
const globalCalls = require('../utils/globalCalls')
const bcrypt = require('bcrypt')

const signup = async(req,res)=>{
    try {
        const {name,email,password} =req.body;
        console.log(name)
        console.log(email)
        console.log(password)
        if(!name || !email || !password){
            return globalCalls.badRequest(res,"All field is required")
        }
    const  existingUser = await User.findOne({email})
    if(existingUser){
        return globalCalls.badRequest(res,"email is already registred")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return globalCalls.successData(res, "User registered successfully", user);

    } catch (error) {
        return globalCalls.serverError(res, error.message);
    }
}


module.exports =signup