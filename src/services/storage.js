import { 
  S3Client, 
  GetObjectCommand, 
  PutObjectCommand 
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class StorageService {
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.VITE_AWS_BUCKET_NAME;
  }

  /**
   * Generate a presigned URL for secure file download
   * @param {string} fileKey - The S3 object key
   * @param {string} fileName - Original file name for download
   * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
   * @returns {Promise<string>} Presigned URL
   */
  async getSecureDownloadUrl(fileKey, fileName, expiresIn = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        ResponseContentDisposition: `attachment; filename="${fileName}"`,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });

      return signedUrl;
    } catch (error) {
      console.error('Error generating download URL:', error);
      throw new Error('Failed to generate secure download link');
    }
  }

  /**
   * Upload a file to S3 with server-side encryption
   * @param {File} file - The file to upload
   * @param {string} path - The path/prefix for the file in S3
   * @returns {Promise<string>} The S3 object key
   */
  async uploadFile(file, path) {
    try {
      const fileKey = `${path}/${Date.now()}-${file.name}`;
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file,
        ContentType: file.type,
        ServerSideEncryption: 'AES256', // Enable server-side encryption
        Metadata: {
          originalName: file.name,
          uploadDate: new Date().toISOString(),
        },
      });

      await this.s3Client.send(command);
      return fileKey;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Check if a file exists in S3
   * @param {string} fileKey - The S3 object key
   * @returns {Promise<boolean>}
   */
  async fileExists(fileKey) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        return false;
      }
      throw error;
    }
  }
}

export const storageService = new StorageService(); 