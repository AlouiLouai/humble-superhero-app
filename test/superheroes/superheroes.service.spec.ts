import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from '../../src/modules/superheroes/superheroes.service';
import { BadRequestException } from '@nestjs/common';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a superhero and return it', async () => {
    const superhero = await service.addSuperhero('Test Hero', 'Flying', 10);
    expect(superhero).toEqual(
      expect.objectContaining({
        name: 'Test Hero',
        superpower: 'Flying',
        humilityScore: 10,
      }),
    );
  });

  it('should return superheroes sorted by humility score', async () => {
    await service.addSuperhero('Hero A', 'Flying', 5);
    await service.addSuperhero('Hero B', 'Strength', 9);
    const superheroes = await service.getSuperheroes();
    expect(superheroes[0].humilityScore).toBe(9);
  });

  it('should throw an error when adding a superhero with a duplicate name', async () => {
    await service.addSuperhero('Hero A', 'Flying', 5);

    try {
      await service.addSuperhero('Hero A', 'Strength', 10);
    } catch (error) {
      // Cast the error to the correct type
      const typedError = error as BadRequestException;
      expect(typedError).toBeInstanceOf(BadRequestException);
      expect(typedError.message).toBe(
        'Superhero with name "Hero A" already exists.',
      );
    }
  });
});
