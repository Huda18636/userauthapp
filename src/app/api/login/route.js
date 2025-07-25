
import bcyprt from 'bcryptjs'
import {connectDB} from '@/util/db';
import Staff from '@/Model/Staff';
import jwt from "jsonwebtoken";


export async function POST(req){
    await connectDB()
    const { email, password} = await req.json();


    const userExist = await Staff.findOne({email})
    if(!userExist){
        return Response.json({message: "User not found.", success: false})
    }
    if(!await bcyprt.compare(password, userExist.password)){
        return Response.json({message: "Invalid password.", success: false})
    }

const token = jwt.sign(
    { userId: userExist._id, role: userExist.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return Response.json({ message: "Valid", token: token, user: userExist,success: true });

}
