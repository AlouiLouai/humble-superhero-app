import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from '../../interfaces/dto/CreateSuperheroDto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  addSuperhero(@Body() createSuperheroDto: CreateSuperheroDto) {
    const { name, superpower, humilityScore } = createSuperheroDto;
    return this.superheroesService.addSuperhero(
      name,
      superpower,
      humilityScore,
    );
  }

  @Get()
  getSuperheroes() {
    return this.superheroesService.getSuperheroes();
  }
}
