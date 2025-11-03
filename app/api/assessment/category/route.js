import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/models/Category'

export async function POST(req) {
    try {
        const { title } = await req.json()

        if (!title) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please provide category title",
                },
                {
                    status: 400
                }
            )
        }

        // connection with database
        await connectDB()

        await Category.create({
            title
        })

        return NextResponse.json(
            {
                success: true,
                message: "Category pushed successfully",
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
                message: "Failed to push category",
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}
