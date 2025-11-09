const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dg2xzngrn",  // your cloud name
    api_key: "675758827543573",
    api_secret: "Qnn5a0TkLV7ncG0aJvwF4BJyLz8",
    secure: true,
    cdn_subdomain: true,
});
const uploadImg = async (fileBuffer, publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: "auto" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};

module.exports = {uploadImg}