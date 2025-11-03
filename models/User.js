import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            // required: true
        },

        image: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },

        phone: {
            type: Number,
            // unique: true,
            required: true,
            maxlength: 10
        },

        role: {
            type: String,
            enum: ["Student", "Admin"],
            default: "Student"
        },

        assessment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Assessment"
            }
        ],

        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
    },

    { timestamps: true }
)

// Hash Password before saving
userSchema.pre('save', async function (next) {
    // Skip if password not changed
    if (!this.isModified) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)  // gives random string value over 2^10 iterations
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

export const User = mongoose.model("User", userSchema)