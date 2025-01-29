import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from '../../src/modules/superheroes/superheroes.controller';
import { SuperheroesService } from '../../src/modules/superheroes/superheroes.service';
import { BadRequestException } from '@nestjs/common';
import { CreateSuperheroDto } from '../../src/modules/superheroes/interfaces/dto/CreateSuperheroDto';
import { Superhero } from '../../src/modules/superheroes/interfaces/Superhero';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        SuperheroesService,
        {
          provide: SuperheroesService,
          useValue: {
            addSuperhero: jest.fn(),
            getSuperheroes: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addSuperhero', () => {
    it('should add a superhero successfully', async () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Flying',
        humilityScore: 10,
      };

      const newSuperhero: Superhero = {
        id: '5c666020-ce10-4b76-b44d-3df947a97f26',
        name: 'Test Hero',
        superpower: 'Flying',
        humilityScore: 10,
      };

      // Directly mock the addSuperhero method for the service
      (service.addSuperhero as jest.Mock).mockResolvedValue(newSuperhero);

      const result = await controller.addSuperhero(createSuperheroDto);

      expect(result).toEqual(newSuperhero);
    });

    it('should throw an error when adding a duplicate superhero', async () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Hero A',
        superpower: 'Flying',
        humilityScore: 5,
      };

      const error = new BadRequestException(
        'Superhero with name "Hero A" already exists.',
      );

      // Directly mock the addSuperhero method to throw an error
      (service.addSuperhero as jest.Mock).mockRejectedValue(error);

      try {
        await controller.addSuperhero(createSuperheroDto);
      } catch (e) {
        const err = e as BadRequestException; // Explicitly type the error

        // Now TypeScript understands that `err` has a `message` property
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toBe(
          'Superhero with name "Hero A" already exists.',
        );
      }
    });
  });

  describe('getSuperheroes', () => {
    it('should return a list of superheroes', async () => {
      const superheroes: Superhero[] = [
        {
          id: '5c666020-ce10-4b76-b44d-3df947a97f26',
          name: 'Test Hero',
          superpower: 'Flying',
          humilityScore: 10,
        },
        {
          id: '7e680a2f-df24-4876-b08e-4cd60fbc00f4',
          name: 'Hero B',
          superpower: 'Strength',
          humilityScore: 8,
        },
      ];

      // Directly mock the getSuperheroes method
      (service.getSuperheroes as jest.Mock).mockResolvedValue(superheroes);

      const result = await controller.getSuperheroes();

      expect(result).toEqual(superheroes);
    });

    it('should return an empty list if no superheroes exist', async () => {
      // Directly mock the getSuperheroes method to return an empty list
      (service.getSuperheroes as jest.Mock).mockResolvedValue([]);

      const result = await controller.getSuperheroes();

      expect(result).toEqual([]);
    });
  });
});
