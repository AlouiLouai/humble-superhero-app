import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSuperheroDto {
  @ApiProperty({ description: 'Name of the superhero', example: 'Batman' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Superpower of the superhero',
    example: 'Genius intellect',
  })
  @IsString()
  superpower: string;

  @ApiProperty({
    description: 'Humility score from 1 to 10',
    example: 7,
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
