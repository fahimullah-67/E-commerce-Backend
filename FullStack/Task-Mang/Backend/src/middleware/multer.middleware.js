import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory (Buffer)

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('File type not supported. Please upload an image.'), false);
        }
    }
});

export default upload;