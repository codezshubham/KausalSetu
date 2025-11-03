import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Answer = mongoose.model('Answer', answerSchema);