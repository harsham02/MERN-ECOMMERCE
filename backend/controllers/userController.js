import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "harsha");
}

//route for user login
const loginUser = async (req, res) => {

    try{
       const {email, password} = req.body;
      const user = await userModel.findOne({email});

       if(!user) {
        return res.json({success: false, message: "User doesn't exists"});
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(isMatch) {
        const token = createToken(user._id);
        res.json({success:true,message:"Login Sucessfully", user,token});
       }else{
        res.json({success:false, message: "Invalid credentials"})
       }
    }catch (error) {
      console.log(error);
      res.json({success:false, message: error.message})
    }
}

//route for user Register
const registerUser = async(req, res) => {
   try{
     const {name, email, password} = req.body;

     //checking user exists or not
     const exists = await userModel.findOne({email});
     if(exists) {
        return res.json({success: false, message: "User already exists"});
     }
     //validation email format and strong password
     
     if(!validator.isEmail(email)){
        return res.json({success: false, message:"Please enter a valid email"});
     }
     if(password.length < 8){
        return res.json({success: false, message:"Please enter a Strong password"});
     }

     //hashing user password

     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password, salt);

     const newUser = new userModel({
         name,
         email,
         password: hashedpassword
    })
    const user = await newUser.save();

    const token =  createToken(user._id);
    res.json({success: true, message:"Sign Up Sucessfully", user, token});
   }catch (error){
    console.log(error);
    res.json({success:false, message: error.message})
   }
}

//route for admin login
const adminLogin = async (req, res) => {
   try{
 const {email, password} = req.body;

 if(email === process.env.ADMIN_EMAIL  || "admin@gmail.com" && password === process.env.ADMIN_PASSWORD || "admin@123" ) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET || "harsha");

      res.json({success: true,message:"Login Sucessfully", token});
 }else{
    res.json({success:false, message: "Invalid credentials"});
 }

   }catch (error) {
    res.json({success:false, message: error.message});
   }
}

export {loginUser, registerUser, adminLogin};