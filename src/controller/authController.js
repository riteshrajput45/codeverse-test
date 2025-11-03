const User = require('../model/User')
const jwt = require('jsonwebtoken')
const globalCalls  = require('../utils/globalCalls')


const signToken =(userId)=>{
      return jwt.sign({id:userId},
        process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN ||'5m'
        } );
}

const register = async(req,res)=>{
     try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return globalCalls.badRequest(res, 'All fields required');

    const exist = await User.findOne({ email });
    if (exist) return globalCalls.badRequest(res, 'Email already registered');

    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id);
    return globalCalls.successData(res, 'Registered', { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
     } catch (error) {
        console.log(error.stack)
        return globalCalls.badRequest(res,error.message)
     }
}


const login = async (req,res)=>{
    try {
        const {email, password}  = req.body
        if(!email || !password) return globalCalls.badRequest(res,"Email &password required")
        
        const user = await User.findOne({email})
        if(!user) return globalCalls.badRequest(res,"Invalid Credentials")

        const ok = await user.comparePassword(password);
        if(!ok) return globalCalls.badRequest(res,"Invalid Credentials")

        
    const token = signToken(user._id);
    return globalCalls.successData(res, 'Login successful', { token });

    } catch (error) {
        console.log(error.stack)
        return globalCalls.serverError(res,error.message)
        
    }
}







module.exports = {register,login}