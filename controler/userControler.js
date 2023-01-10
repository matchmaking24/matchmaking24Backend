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
        const lastActive = new Date()
        await userScheema.findOneAndUpdate({email},{$set:{lastActive}})
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
        const usersData = []
        for(let i=0;i<users.length;i++){
            if(users[i].industry){
                usersData.push(users[i])
            }
        }
        return res.status(200).json({success:true,message:usersData})
    } catch (error) {
        return res.status(500).json({success:false,message:`some internal error ${error}`})
    }
}

const updateUser = async(req,res)=>{
    try {
        const {email,language,lokingFor,year,calendly} = req.body;
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
            if(year){
                const currentYear = new Date().getFullYear()
                const age = currentYear-year.split('-')[0]
                await userScheema.findOneAndUpdate({email:email},{$set:{age:age}})

            }
            await userScheema.findOneAndUpdate({email:email},{$set:{calendly,...req.body}})
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