import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    ques: {
        type: String,
        required: true
    },
    ans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

export const Question = mongoose.model('Question', questionSchema);