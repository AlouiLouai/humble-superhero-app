import React from 'react';
import { SuperheroCard } from './SuperHeroCard';

interface Superhero {
  id: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

interface SuperheroListProps {
  superheroes: Superhero[];
}

export function SuperheroList({ superheroes }: SuperheroListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {superheroes.map((superhero) => (
        <SuperheroCard key={superhero.id} superhero={superhero} />
      ))}
    </div>
  );
}
