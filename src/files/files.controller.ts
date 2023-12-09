import { Controller, Get, Param, Post, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { Response } from 'express';
import fs from 'fs';
import { google } from 'googleapis';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { ResponseMessage } from 'src/decorator/customize';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigService,
  ) { }

  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileUpload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

    let folderId = folders.data.files.length > 0 ? folders.data.files[0].id : null;

    if (!folderId) {
      const folder = await drive.files.create({
        requestBody: {
          name: FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
        },
      });
      folderId = folder.data.id;
    }

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimetype,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    fs.unlinkSync(file.path);

    const url = `https://drive.google.com/uc?id=${response.data.id}`;

    return url;
  }

  @Get('download-file/:url')
  //  swagger
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'API download file' })
  async downloadFileFromURL(@Res() res: Response, @Param('url') url: string) {
    try {
      const response = await axios.get(url, { responseType: 'stream' });

      const filename = this.getFilename(response.headers['content-disposition']) || String(Date.now());

      const contentType = response.headers['content-type'];
      const fileExtension = contentType.split('/').pop();

      if (fileExtension) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      } else {
        throw new Error('The file type cannot be identified !');
      }

      const result = await response.data.pipe(res);
      return { filename: filename, file: result };
    } catch (error) {
      res.status(500).send({ message: error.message, stack: error.stack });
    }
  }

  getFilename(contentDisposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return '';
  }
}
