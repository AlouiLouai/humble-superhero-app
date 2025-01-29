import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from '../../interfaces/dto/CreateSuperheroDto';
import { Superhero } from '../../interfaces/Superhero';

@Controller('superheroes')
export class SuperheroesController {
  private readonly logger = new Logger(SuperheroesController.name);

  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addSuperhero(
    @Body() createSuperheroDto: CreateSuperheroDto,
  ): Promise<Superhero> {
    this.logger.log(
      `Received request to add superhero: ${createSuperheroDto.name}`,
    );
    try {
      const newSuperhero = await this.superheroesService.addSuperhero(
        createSuperheroDto.name,
        createSuperheroDto.superpower,
        createSuperheroDto.humilityScore,
      );

      this.logger.log(`Successfully added superhero: ${newSuperhero.name}`);
      return newSuperhero;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to add superhero: ${err.message}`);
      throw error;
    }
  }

  @Get()
  async getSuperheroes(): Promise<Superhero[]> {
    this.logger.log('Received request to get superheroes');
    try {
      const superheroes = await this.superheroesService.getSuperheroes();
      this.logger.log(`Returning ${superheroes.length} superheroes`);
      return superheroes;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to fetch superheroes: ${err.message}`);
      throw error;
    }
  }
}
