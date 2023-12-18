import UserModel from "@/models/User";
import connectDB from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

interface ReqBody {
    email: string,
    password: string
}
export const POST = async (request: NextRequest) => {

    const body: ReqBody = await request.json()

    const { email, password } = body
    await connectDB()

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        return new NextResponse("Email already exists", { status: 400 })
    }



    try {
        const newUser = await UserModel.create({
            email,
            password
        })
        if (!newUser) {
            throw new Error("Error creating user")
        }
        return new NextResponse("User successfully created", { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error creating user", { status: 500 })
    }
}