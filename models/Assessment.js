import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
    completeness: {
        type: Boolean,
        default: false,
        // required: true,
    },

    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the specific Category
        required: true,
    }

}, {timestamps: true})

export const Assessment = mongoose.model('Assessment', assessmentSchema);