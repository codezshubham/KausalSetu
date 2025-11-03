import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        gender: {
            type: String
        },

        language: {
            type: String
        },

        grade: {
            type: String,
            enum: ["9", "10", "11", "12", "Others"]
        },

        schoolName: {
            type: String
        },

        intersest: [
            {
                type: String
            }
        ],

        higherStudy: {
            type: String,
            enum: ["Yes", "No", "Not Sure"]
        },

        state: {
            type: String
        },

        locality: {
            type: String
        }
    },

    { timestamps: true }
)

export const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema)