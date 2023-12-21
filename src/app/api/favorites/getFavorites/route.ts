import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/util/db"
import UserModel from "@/models/User"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")
    await connectDB()
    const resp = await UserModel.findOne({ email: email })

    if (resp) {
        return new NextResponse(JSON.stringify(resp.favorites), { status: 200 })
    }
    return new NextResponse(JSON.stringify("Error fetching favorites"), { status: 400 })
}