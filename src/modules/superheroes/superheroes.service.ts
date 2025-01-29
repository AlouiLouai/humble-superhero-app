import {
  BadRequestException,
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Superhero } from '../../interfaces/Superhero';

@Injectable()
export class SuperheroesService {
  private readonly logger = new Logger(SuperheroesService.name);
  private superheroes: Superhero[] = [];

  async addSuperhero(
    name: string,
    superpower: string,
    humilityScore: number,
  ): Promise<Superhero> {
    try {
      if (this.superheroes.some((hero) => hero.name === name)) {
        this.logger.warn(`Superhero with name "${name}" already exists.`);
        throw new BadRequestException(
          `Superhero with name "${name}" already exists.`,
        );
      }

      const superhero = new Superhero(name, superpower, humilityScore);
      this.superheroes.push(superhero);

      this.logger.log(`Added superhero: ${name}`);
      return Promise.resolve(superhero);
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to add superhero "${name}": ${err.message}`);
      throw error;
    }
  }

  async getSuperheroes(): Promise<Superhero[]> {
    try {
      const sortedHeroes = await Promise.resolve(
        [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore),
      );
      this.logger.debug(
        `Returning ${sortedHeroes.length} superheroes sorted by humilityScore`,
      );
      return sortedHeroes;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to retrieve superheroes: ${err.message}`);
      throw new InternalServerErrorException(
        'An error occurred while fetching superheroes.',
      );
    }
  }
}
