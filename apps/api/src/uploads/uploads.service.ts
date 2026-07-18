import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ url: string; publicId: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/webp',
      'video/mp4', 'video/webm',
      'application/pdf',
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only Images, MP4/WebM videos, PDFs, and Word documents are allowed.',
      );
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new BadRequestException('File is too large. Maximum size is 50MB.');
    }

    const isImage = file.mimetype.startsWith('image/');

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'paradise-school',
          resource_type: 'auto',
          ...(isImage && {
            format: 'webp',
            transformation: [{ width: 1200, crop: 'limit' }, { quality: 'auto' }],
          }),
        },
        (error, result) => {
          if (error || !result) {
            reject(new BadRequestException('Upload failed: ' + (error?.message || 'Unknown error')));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        },
      );

      upload.end(file.buffer);
    });
  }
}
