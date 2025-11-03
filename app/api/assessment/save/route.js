import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db';
import { Category } from '@/models/Category'
import { SubCategory } from '@/models/SubCategory'
import { Question } from '@/models/Question'
import { Answer } from "@/models/Answer";
import { Assessment } from "../../../../models/Assessment";
import { User } from "../../../../models/User";

export async function POST(req) {
    try {

        const {
            userId,
            category,
            answers
        } = await req.json()

        if (!userId || !category || !answers) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Provide all neccessary details for to save assessment result"
                },
                {
                    status: 400
                }
            )
        }

        // connection with DB
        await connectDB()

        const categoryDetails = await Category.findOne(
            {
                title: category
            }
        )

        if (!categoryDetails) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Provide category not found!"
                },
                {
                    status: 400
                }
            )
        }

        // console.log("categoryDetails: ", categoryDetails._id)

        answers.forEach(
            async (answer) => {
                const ansResponse = await Answer.create(
                    {
                        userId,
                        value: answer?.answerValue
                    }
                )

                await Question.findOneAndUpdate(
                    {
                        ques: answer?.questionText
                    },

                    {
                        $push: {
                            ans: ansResponse?._id
                        }
                    }
                )
            }
        )

        const assessmentDetails = await Assessment.create({
            completeness: true,
            details: categoryDetails._id
        })

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    assessment: assessmentDetails?._id
                }
            },
            {new: true}
        )

        // console.log("Updated user: ", updatedUser)

        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to update user!"
                },
                {
                    status: 400
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Assessment result pushed successfully",
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
                message: "Failed to save assessment result",
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}