import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

export class Superhero {
  id: string; // Use string for UUIDs
  name: string;
  superpower: string;
  humilityScore: number;

  constructor(name: string, superpower: string, humilityScore: number) {
    this.id = uuidv4(); // Generate a unique ID on instantiation
    this.name = name;
    this.superpower = superpower;
    this.humilityScore = humilityScore;
  }
}
