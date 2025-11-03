// models/Category.js
import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, // e.g., "Aptitude", "Interests"
    },

    questionSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

export const SubCategory = mongoose.model('SubCategory', subCategorySchema);