import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';

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

  it('should add a superhero and return it', () => {
    const superhero = service.addSuperhero('Test Hero', 'Flying', 10);
    expect(superhero).toEqual({
      name: 'Test Hero',
      superpower: 'Flying',
      humilityScore: 10,
    });
  });

  it('should return superheroes sorted by humility score', () => {
    service.addSuperhero('Hero A', 'Flying', 5);
    service.addSuperhero('Hero B', 'Strength', 9);
    const superheroes = service.getSuperheroes();
    expect(superheroes[0].humilityScore).toBe(9);
  });
});
