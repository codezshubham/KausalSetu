import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Question } from '@/models/Question'
import { SubCategory } from '@/models/SubCategory'

export async function POST(req) {
    try {
        const {
            questionTitle,
            subCategoryTitle
        } = await req.json()

        if (!questionTitle || !subCategoryTitle) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Provide all neccessary details for entry in question"
                },
                {
                    status: 400
                }
            )
        }

        // connection with DB
        await connectDB()

        const newQuestion = await Question.create({
            ques: questionTitle
        })

        if (!newQuestion) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to create question",
                },
                {
                    status: 400
                }
            )
        }

        await SubCategory.findOneAndUpdate(
            { title: subCategoryTitle },
            {
                $push: {
                    questionSection: newQuestion._id
                }
            }
        )

        return NextResponse.json(
            {
                success: true,
                message: "question pushed successfully",
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
                message: "Failed to push question",
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}