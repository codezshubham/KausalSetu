// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, // e.g., "Aptitude", "Interests"
    },

    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            // required: true
        }
    ]
});

export const Category = mongoose.model('Category', categorySchema);