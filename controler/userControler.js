const userScheema = require('../model/userModel.js')

const RegisterUser = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await userScheema.findOne({email})
        if(!user){
            const newUser =  new userScheema({...req.body});
            await newUser.save();
            return res.status(200).json({success:true,message:"Profile Registerd"})
        }
        return res.status(200).json({success:true,message:user})
    } catch (error) {
        return res.status(500).json({success:false,message:`some internal error ${error}`})
    }
}
 
const getSingleUser = async (req,res)=>{
    try {
        const email = req.params.email
        const user = await userScheema.findOne({email})
        if(user){
            return res.status(200).json({success:true,message:user})
        }
        return res.status(200).json({success:false,message:"User not Found"})
    } catch (error) {
        return res.status(500).json({success:false,message:`some internal error ${error}`})
    }
}

const getAlluser = async (req,res)=>{
    try {
        const {page} = req.query
        const Skip =( page-1)*10;
        const users = await userScheema.find().skip(Skip).limit(10)
        return res.status(200).json({success:true,message:users})
    } catch (error) {
        return res.status(500).json({success:false,message:`some internal error ${error}`})
    }
}

const updateUser = async(req,res)=>{
    try {
        const {email,language,lokingFor} = req.body;
        const user = await userScheema.findOne({email})
       
        if(user){
            if(language){
                for(let i = 0; language.length>i;i++){
                    await userScheema.findOneAndUpdate({email:email},{$push:{language:language[i]}})
                }
            }
            if(lokingFor){
                for(let i = 0; lokingFor.length>i;i++){
                    await userScheema.findOneAndUpdate({email:email},{$push:{lokingFor:lokingFor[i]}})
                }
            }
            await userScheema.findOneAndUpdate({email:email},{$set:{...req.body}})
            return res.status(200).json({success:true, message:"Profile Updated"})
        }
        return res.status(200).json({success:true, message:"user not found"})

    } catch (error) {
        return res.status(500).json({success:false,message:`some internal error ${error}`})
    }
}

const deleteUser = async(req,res,next)=>{
    try {
        const checkUser = await userScheema.findOne({email:req.params.email});
        if(checkUser){
            await userScheema.findByIdAndDelete(checkUser._id);
            return res.status(200).send(`User "${checkUser.name}" deleted!`)
        }
        return res.status(404).send("User not found")
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = {RegisterUser,getAlluser,getSingleUser,updateUser,deleteUser}