import cloudinary from 'cloudinary';

const setupCloudinary = () => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const uploadImageFromUrlToCloudinary = async (
    url: string,
    publicId: string,
): Promise<cloudinary.UploadApiResponse> => {
    return cloudinary.v2.uploader.upload(url, {
        public_id: publicId,
        // invalidate: true,
        overwrite: false,
    });
};

export { setupCloudinary, uploadImageFromUrlToCloudinary };
