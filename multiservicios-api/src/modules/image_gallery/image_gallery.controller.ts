import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ImageGalleryService } from './image_gallery.service';
import { ImageGallery } from '../../models/image_gallery';

@Controller('image_gallery')
export class ImageGalleryController {
    constructor(private readonly imageGalleryService: ImageGalleryService) { }

    @Get()
    findAll(): Promise<ImageGallery[]> {
        return this.imageGalleryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<ImageGallery | null> {
        return this.imageGalleryService.findOne(Number(id));
    }

    @Post()
    create(@Body() imageGallery: Partial<ImageGallery>): Promise<ImageGallery> {
        return this.imageGalleryService.create(imageGallery);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() imageGallery: Partial<ImageGallery>): Promise<ImageGallery | null> {
        return this.imageGalleryService.update(Number(id), imageGallery);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.imageGalleryService.remove(Number(id));
    }
}
