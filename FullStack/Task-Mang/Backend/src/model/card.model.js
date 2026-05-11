import  mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    title: {
        
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Task title must be at least 3 characters']
    },
    description: {
        type: String,
        trim: true
    },
    project: { // Redundant but useful for easy filtering/permissions, points to the parent project
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    list: { // Which list (column) the card is currently in
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    assignedTo: { // The student assigned to this task
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date
    },
    position: { // For ordering cards within a list
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['assigned', 'in-progress', 'submitted', 'under-review', 'revisions-needed', 'completed'],
        default: 'assigned'
    },
    // --- Student Submission Fields ---
    studentSubmission: {
        repositoryLink: String,
        deploymentLink: String,
        projectLayoutPicture: String, // URL to the image
        submittedAt: Date // Timestamp when the student submitted
    },
    // --- Teacher Review Fields ---
    teacherReview: {
        feedback: String,
        grade: String, // Or Number, depending on your grading scale
        reviewedAt: Date
    }
}, { timestamps: true });

// Optional: Add a pre-delete hook to clean up associated comments

CardSchema.pre('remove', async function(next) {
    await this.model('Comment').deleteMany({ card: this._id });
    next();
});

// await Card.findByIdAndDelete(id);
// await Comment.deleteMany({ card: id });


const Card = mongoose.model('Card', CardSchema);
export default Card;