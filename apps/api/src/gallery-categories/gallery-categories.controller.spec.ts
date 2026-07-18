import { Test, TestingModule } from '@nestjs/testing';
import { GalleryCategoriesController } from './gallery-categories.controller';

describe('GalleryCategoriesController', () => {
  let controller: GalleryCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryCategoriesController],
    }).compile();

    controller = module.get<GalleryCategoriesController>(
      GalleryCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
