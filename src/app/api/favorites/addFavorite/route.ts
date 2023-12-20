import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/util/db"
import UserModel from "@/models/User"

export async function POST(request: NextRequest) {


    const { email, favorite } = await request.json()
    await connectDB()
    const resp = await UserModel.findOneAndUpdate(
        { email: email },
        { $push: { favorites: favorite } }
    )

    if (resp) {
        return new NextResponse(JSON.stringify("Successfully added to favorites"), { status: 200 })
    }
    return new NextResponse(JSON.stringify("Error adding to favorites"), { status: 400 })
}