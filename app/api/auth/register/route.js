import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User'

export async function POST(req) {
    try {
        const {
            // role,
            firstName,
            lastName,
            phone,
            email,
            password
        } = await req.json()

        

        if (!firstName || !phone || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required to register user!",
                },
                {
                    status: 400
                }
            )
        }

        // connection with database
        await connectDB()

        // check for user, if already exist
        const userExists = await User.findOne({ email })

        if (userExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is already registered!",
                },
                {
                    status: 400
                }
            )
        }

        

        await User.create({
            // role,
            firstName,
            lastName,
            phone,
            email,
            password,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        console.log("Backend *")

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully 🎉",
            },
            {
                status: 201
            }
        )
    }
    catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to register user",
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}
