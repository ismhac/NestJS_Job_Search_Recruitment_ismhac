import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://captainhac:12345@cluster0.7bskhhv.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
