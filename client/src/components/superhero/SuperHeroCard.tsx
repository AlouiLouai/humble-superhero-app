import React from 'react';
import { Superhero } from '@/interfaces/Superhero';

interface SuperheroCardProps {
  superhero: Superhero;
}

export function SuperheroCard({ superhero }: SuperheroCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{superhero.name}</div>
        <p className="text-gray-700 text-base mb-2">{superhero.superpower}</p>
        <div className="flex items-center">
          <span className="text-gray-700 text-sm mr-2">Humility Score:</span>
          <span className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded">
            {superhero.humilityScore}
          </span>
        </div>
      </div>
    </div>
  );
}
