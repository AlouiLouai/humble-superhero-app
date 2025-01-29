import { Superhero } from '@/types/Superhero';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/superheroes';

export class SuperheroService {
  static async fetchSuperheroes(): Promise<Superhero[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok)
        throw new Error(
          `Error ${response.status}: Failed to fetch superheroes`,
        );
      return response.json();
    } catch (error) {
      console.error('Fetch Superheroes Error:', error);
      throw new Error('Could not load superheroes. Please try again.');
    }
  }

  static async addSuperhero(
    newSuperhero: Omit<Superhero, 'id'>,
  ): Promise<Superhero> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSuperhero),
      });

      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to add superhero`);
      return response.json();
    } catch (error) {
      console.error('Add Superhero Error:', error);
      throw new Error('Could not add superhero. Please try again.');
    }
  }
}
