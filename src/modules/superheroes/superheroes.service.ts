import {
  BadRequestException,
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Superhero } from './interfaces/Superhero';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSuperheroDto } from './interfaces/dto/CreateSuperheroDto';

@Injectable()
export class SuperheroesService {
  private readonly logger = new Logger(SuperheroesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async addSuperhero(dto: CreateSuperheroDto): Promise<Superhero> {
    try {
      const { name, superpower, humilityScore } = dto;
      // Check if the superhero already exists in the database
      const existingHero = await this.prisma.superhero.findFirst({
        where: { name },
      });
      if (existingHero) {
        this.logger.warn(`Superhero with name "${name}" already exists.`);
        throw new BadRequestException(
          `Superhero with name "${name}" already exists.`,
        );
      }
      // Create and save the new superhero
      const superhero = await this.prisma.superhero.create({
        data: { name, superpower, humilityScore },
      });
      this.logger.log(`Added superhero: ${name}`);
      return superhero;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Failed to add superhero: ${err.message}`);
      throw error;
    }
  }

  async getSuperheroes(): Promise<Superhero[]> {
    try {
      const sortedHeroes = await this.prisma.superhero.findMany({
        orderBy: { humilityScore: 'desc' },
      });

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
