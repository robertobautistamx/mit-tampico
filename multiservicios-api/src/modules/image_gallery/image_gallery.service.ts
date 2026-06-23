import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { ImageGallery } from "../../models/image_gallery";

@Injectable()
export class ImageGalleryService {
    constructor(
        @InjectRepository(ImageGallery)
        private readonly imageGalleryRepository: Repository<ImageGallery>,
    ) { }

    async findAll(): Promise<ImageGallery[]> {
        return await this.imageGalleryRepository.find({ relations: ['categoria'] });
    }

    async findOne(id: number): Promise<ImageGallery | null> {
        return await this.imageGalleryRepository.findOne({ where: { id }, relations: ['categoria'] });
    }

    async create(imageGallery: Partial<ImageGallery>): Promise<ImageGallery> {
        const nuevo = this.imageGalleryRepository.create(imageGallery);
        return await this.imageGalleryRepository.save(nuevo);
    }

    async update(id: number, imageGallery: Partial<ImageGallery>): Promise<ImageGallery | null> {
        await this.imageGalleryRepository.update(id, imageGallery);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.imageGalleryRepository.delete(id);
    }
}