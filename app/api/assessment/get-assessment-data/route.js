import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db';
import { User } from "../../../../models/User";

export async function POST(req) {
    try {
        const { userId } = req.json()

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Provide userId to get assessment data"
                },
                {
                    status: 400
                }
            )
        }

        const userDetail = User.findById(userId)

        if (!userDetail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found!"
                },
                {
                    status: 400
                }
            )
        }

        userDetail?.assessment.forEach((assessment) => {
            const category = assessment?.details?.title

            assessment?.details?.subSection.forEach((subSection) => {
                ques_ans = []
                const title = subSection?.title

                subSection?.questionSection.forEach((question) => {
                    const ques = question?.ques

                    question?.ans.forEach((answer) => {
                        if (answer?.findOne({ userId })) {
                            const ans = answer?.findOne({ userId })?.value

                            temp = {}
                            temp["ques"] = ques
                            temp["ans"] = ans
                            ques_ans.push(temp)

                            break
                        }
                    })
                })

                temp = {}

                temp["title"] = title
                temp["ques_ans"] = ques_ans

            })
        })
    }
} 
