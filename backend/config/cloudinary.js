import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME || "ducdcdvvy",
        api_key:process.env.CLOUDINARY_API_KEY || "776544324992173",
        api_secret:process.env.CLOUDINARY_SECRET_KEY || "WDktRilGO4woXIcbWDfDg_Xq9Uc"
    })
}

export default connectCloudinary;