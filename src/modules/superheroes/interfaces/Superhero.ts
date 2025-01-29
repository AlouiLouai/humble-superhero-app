import { v4 as uuidv4 } from 'uuid';

export class Superhero {
  id: string;
  name: string;
  superpower: string;
  humilityScore: number;

  constructor(name: string, superpower: string, humilityScore: number) {
    this.id = uuidv4();
    this.name = name;
    this.superpower = superpower;
    this.humilityScore = humilityScore;
  }
}
