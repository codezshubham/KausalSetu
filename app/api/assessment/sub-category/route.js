import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Category } from '@/models/Category'
import { SubCategory } from '@/models/SubCategory'

export async function POST(req) {
    try {
        const {
            categoryTitle,
            subCategoryTitle
        } = await req.json()

        if (!categoryTitle || !subCategoryTitle) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Provide all neccessary details for entry in subCategory"
                },
                {
                    status: 400
                }
            )
        }

        // connection with DB
        await connectDB()

        const newSubCategory = await SubCategory.create({
            title: subCategoryTitle
        })

        if (!newSubCategory) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to create sub category",
                },
                {
                    status: 400
                }
            )
        }

        await Category.findOneAndUpdate(
            { title: categoryTitle },
            {
                $push: {
                    subSection: newSubCategory._id
                }
            }
        )

        return NextResponse.json(
            {
                success: true,
                message: "subCategory pushed successfully",
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
                message: "Failed to push subCategory",
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}