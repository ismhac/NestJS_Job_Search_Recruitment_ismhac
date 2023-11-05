import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';
import axios from 'axios';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import fs from 'fs';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigService,
  ) { }

  @Public()
  @Post('upload')
  @UseFilters(new HttpExceptionFilter())
  @ResponseMessage('Upload file successfully')
  @UseInterceptors(FileInterceptor('fileUpload'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const CLIENT_ID = this.configService.get<string>('CLIENT_ID');
    const CLIENT_SECRET = this.configService.get<string>('CLIENT_SECRET');
    const REFRESH_TOKEN = this.configService.get<string>('REFRESH_TOKEN');
    const REFRESH_URI = this.configService.get<string>('REFRESH_URI');
    const FOLDER_NAME = this.configService.get<string>('FOLDER_NAME');

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REFRESH_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    });


    const folders = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${FOLDER_NAME}'`,
    });
    let folderId;

    if (folders.data.files.length === 0) {
      // Thư mục chưa tồn tại, tạo thư mục mới
      const folder = await drive.files.create({
        requestBody: {
          name: FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
        },
      });
      folderId = folder.data.id;
    } else {
      // Thư mục đã tồn tại, lấy id của nó
      folderId = folders.data.files[0].id;
    }

    // Tải file lên thư mục vừa tạo hoặc đã tồn tại
    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimetype,
        parents: [folderId], // Sử dụng id của thư mục làm cha
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    fs.unlinkSync(file.path);

    // Lấy đường dẫn trên Google Drive bằng cách kết hợp id với URL cơ bản của Google Drive
    const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;

    return {
      fileName: file.filename,
      fileId: response.data.id,
      fileUrl: fileUrl,
    }
  }

  @Public()
  @Get('download-file/:fileId')
  async downloadFileFromURL(
    @Res() res: Response,
    @Param('fileId') fileId: string) {
    try {
      const url = `https://drive.google.com/uc?id=${fileId}`;
      const response = await axios.get(url, { responseType: 'stream' });

      const contentType = response.headers['content-type'];
      const fileExtension = contentType.split('/').pop(); // Lấy phần mở rộng từ kiểu MIME

      if (fileExtension) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${fileId}.${fileExtension}"`);
      } else {
        throw new Error('The file type cannot be identified !');
      }
      response.data.pipe(res);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
