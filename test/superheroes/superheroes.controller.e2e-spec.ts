import * as request from 'supertest';
import * as http from 'http';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { SuperheroesModule } from '../../src/modules/superheroes/superheroes.module';
import { SuperheroesService } from '../../src/modules/superheroes/superheroes.service';
import { CreateSuperheroDto } from '../../src/modules/superheroes/interfaces/dto/CreateSuperheroDto';
import { Superhero } from '../../src/modules/superheroes/interfaces/Superhero';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SuperheroesModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<SuperheroesService>(SuperheroesService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

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

    // Mock the service method to return the superhero
    jest.spyOn(service, 'addSuperhero').mockResolvedValue(newSuperhero);

    const response = await request(app.getHttpServer() as http.Server)
      .post('/superheroes')
      .send(createSuperheroDto)
      .expect(201);

    expect(response.body).toEqual(newSuperhero);
  });

  it('should throw an error when adding a duplicate superhero', async () => {
    const createSuperheroDto: CreateSuperheroDto = {
      name: 'Hero A',
      superpower: 'Flying',
      humilityScore: 5,
    };

    const errorResponse = {
      statusCode: 400,
      message: 'Superhero with name "Hero A" already exists.',
      error: 'Bad Request',
    };

    // Mock the service method to throw an error for duplicate superheroes
    jest
      .spyOn(service, 'addSuperhero')
      .mockRejectedValue(new BadRequestException(errorResponse.message));

    // This time catch the error and expect a 400 response
    const response = await request(app.getHttpServer() as http.Server)
      .post('/superheroes')
      .send(createSuperheroDto)
      .expect(400);

    expect(response.body).toEqual(errorResponse);
  });

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

    // Mock the service method to return a list of superheroes
    jest.spyOn(service, 'getSuperheroes').mockResolvedValue(superheroes);

    const response = await request(app.getHttpServer() as http.Server)
      .get('/superheroes')
      .expect(200);

    expect(response.body).toEqual(superheroes);
  });

  it('should return an empty list if no superheroes exist', async () => {
    // Mock the service method to return an empty list of superheroes
    jest.spyOn(service, 'getSuperheroes').mockResolvedValue([]);

    const response = await request(app.getHttpServer() as http.Server)
      .get('/superheroes')
      .expect(200);

    expect(response.body).toEqual([]);
  });
});
