import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (fileBuffer, folder) => {
    // Convert Buffer to a Base64 string (Data URI)
    const dataURI = `data:${fileBuffer.mimetype};base64,${fileBuffer.buffer.toString('base64')}`;
    
    return cloudinary.uploader.upload(dataURI, {
        folder: folder, // e.g., 'profile_pictures'
        resource_type: 'auto'
    });
};

export default uploadToCloudinary;