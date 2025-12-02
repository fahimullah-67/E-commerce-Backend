// In controllers/userController.js
import User from '../model/user.model.js';
import uploadToCloudinary from '../utils/cloudinary.utils.js'; 
//import { deleteFromCloudinary } from '../utils/cloudinary'); // Add deletion function for updates

export default updateProfilePicture = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 1. Upload new image to Cloudinary
        const result = await uploadToCloudinary(req.file, 'coder_todo_profiles');
        
        // Optional: 2. Delete the old image from Cloudinary (using user.profilePicture.public_id)
        // You would implement this step if the user had a custom image before.

        // 3. Update MongoDB User document
        user.profilePicture.url = result.secure_url;
        user.profilePicture.public_id = result.public_id;

        await user.save();

        res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePicture: user.profilePicture
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during file upload.' });
    }
};

