
import bcyprt from 'bcryptjs'
import {connectDB} from '@/util/db';
import Staff from '@/Model/Staff';


export async function POST(req){
    await connectDB()
    const {name, email, password} = await req.json();


    const userExist = await Staff.findOne({email})
    if(userExist){
        return Response.json({message: "Email Already Exist", success: false})
    }

   
    const hashedPassword = await bcyprt.hash(password, 10);
    // const hashedPassword = password; // Assuming password hashing is handled elsewhere

    const user = await Staff.create({name: name, email: email, password: hashedPassword})
    return Response.json({message: "Staff member added Registered", success: true})

}
