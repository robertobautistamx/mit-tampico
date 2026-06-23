import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageGallery } from '../../models/image_gallery';
import { ImageGalleryService } from './image_gallery.service';
import { ImageGalleryController } from './image_gallery.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ImageGallery])],
    providers: [ImageGalleryService],
    controllers: [ImageGalleryController],
    exports: [ImageGalleryService],
})

export class ImageGalleryModule { }