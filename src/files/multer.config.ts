import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from 'fs';
import { diskStorage } from "multer";
import path, { join } from "path";
import { DatabasesService } from "src/databases/databases.service";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    private readonly logger = new Logger(DatabasesService.name);

    getRootPath = () => {
        return process.cwd();
    };

    ensureExists(targetDirectory: string) {
        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
            this.logger.log('Directory successfully created.');
        } else {
            this.logger.log('Directory already exists.');
        }
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const folder = req?.headers?.folder_type ?? "default";
                    const targetDirectory = `public/${folder}`;
                    this.ensureExists(targetDirectory);
                    cb(null, join(this.getRootPath(), targetDirectory))
                },
                filename: (req, file, cb) => {
                    //get image extension
                    let extName = path.extname(file.originalname);
                    //get image's name (without extension)
                    let baseName = path.basename(file.originalname, extName);
                    let finalName = `${baseName}-${Date.now()}${extName}`
                    cb(null, finalName)
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
                const fileExtension = file.originalname.split('.').pop().toLowerCase();
                const isValidFileType = allowedFileTypes.includes(fileExtension);
                if (!isValidFileType) {
                    cb(new HttpException('Invalid file type', HttpStatus.UNPROCESSABLE_ENTITY), null);
                } else
                    cb(null, true);
            },
            limits: {
                fileSize: 1024 * 1024 * 5 // 1MB
            }
        };
    }
}
