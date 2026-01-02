const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure AWS S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Upload a file to AWS S3
 * @param {Object} file - The file object from Multer
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
const uploadFile = async (file) => {
    // Generate a unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Uncomment if you want files to be publicly readable via ACLs (though bucket policies are preferred)
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Construct the public URL (assumes standard S3 URL structure)
        // For production, you might want to use a CloudFront URL instead
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('File upload failed');
    }
};

module.exports = uploadFile;
