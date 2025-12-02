import {Router} from 'express'
import upload from '../middleware/multer.middleware.js';
import userController from '../controllers/user.controller.js'; // Controller function
import { protect } from '../middleware/authMiddleware.js'; // Auth middleware

const router = Router();


// Route to update profile picture
router.put(
    '/profile/picture',
    protect, // Authenticate the user
    upload.single('profileImage'), 
    userController.updateProfilePicture
);

export default router;