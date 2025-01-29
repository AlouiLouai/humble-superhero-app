import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Superhero {
  @ApiProperty({
    description: 'Unique ID of the superhero',
    example: '2c72dba6-53e6-4034-90c4-5ea38d6da135',
  })
  id: string;
  @ApiProperty({ description: 'Name of the superhero', example: 'Batman' })
  name: string;
  @ApiProperty({
    description: 'Superpower of the superhero',
    example: 'Genius intellect',
  })
  superpower: string;
  @ApiProperty({ description: 'Humility score from 1 to 10', example: 7 })
  humilityScore: number;

  constructor(name: string, superpower: string, humilityScore: number) {
    this.id = uuidv4();
    this.name = name;
    this.superpower = superpower;
    this.humilityScore = humilityScore;
  }
}
