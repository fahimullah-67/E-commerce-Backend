import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment content cannot be empty'],
        trim: true
    },
    author: { // User who made the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    card: { // Which card this comment belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;