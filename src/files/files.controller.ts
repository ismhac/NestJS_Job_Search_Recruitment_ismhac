import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';
import axios from 'axios';
import { Response } from 'express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) { }

  // @Public()
  @Post('upload')
  @UseFilters(new HttpExceptionFilter())
  @ResponseMessage('Upload file successfully')
  @UseInterceptors(FileInterceptor('fileUpload'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename,
    }
  }

  @Public()
  @Get('download-file/:fileName')
  async downloadFileFromURL(
    @Res() res: Response,
    @Param('fileName') fileName: string) {
    try {
      const url = `https://v1-rm-be-nestjs-785603e48f0d.herokuapp.com/images/default/${fileName}`;
      const response = await axios.get(url, { responseType: 'stream' });

      const contentType = response.headers['content-type'];
      const fileExtension = contentType.split('/').pop(); // Lấy phần mở rộng từ kiểu MIME

      if (fileExtension) {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="downloaded-file.${fileExtension}"`);
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
