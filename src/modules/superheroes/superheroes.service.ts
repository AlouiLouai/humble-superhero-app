import { Injectable } from '@nestjs/common';
import { Superhero } from '../../interfaces/Superhero';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [];

  addSuperhero(
    name: string,
    superpower: string,
    humilityScore: number,
  ): Superhero {
    const superhero = new Superhero(name, superpower, humilityScore);
    this.superheroes.push(superhero);
    return superhero;
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
