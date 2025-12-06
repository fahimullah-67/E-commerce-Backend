const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        minlength: [3, 'Project name must be at least 3 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    owner: { // The teacher who created/owns the project
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{ // Students enrolled in this project
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    visibility: {
        type: String,
        enum: ['private', 'public'], // You might start with only 'private' for simplicity
        default: 'private'
    },
    // If you plan for multiple boards per project, this would be a separate model
    // For simplicity, we'll embed lists directly or assume one main board
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
}, { timestamps: true });

// Add a pre-delete hook to clean up associated lists and cards
ProjectSchema.pre('remove', async function(next) {
    // This assumes List and Card models exist and reference Project
    await this.model('List').deleteMany({ project: this._id });
    await this.model('Card').deleteMany({ project: this._id });
    next();
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
