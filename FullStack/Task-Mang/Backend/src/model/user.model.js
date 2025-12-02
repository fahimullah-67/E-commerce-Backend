import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'], // Enforce specific roles
        default: 'student' // Default role for new registrations
    },
    profilePicture: {
        url: { // The URL returned by Cloudinary (what the frontend uses to display the image)
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        public_id: { // The ID used to delete or update the image on Cloudinary
            type: String,
            default: 'placeholder_id'
        }
    },
    // For students: to list projects they are part of
    // This will be populated dynamically or managed in the Project model
    enrolledProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    // For teachers: to list projects they own
    ownedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, { timestamps: true }); 

// Hash password before saving the user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User; 