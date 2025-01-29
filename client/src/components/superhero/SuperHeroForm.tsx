'use client';
import React, { useState } from 'react';

interface SuperheroFormProps {
  onAddSuperhero: (superhero: {
    name: string;
    superpower: string;
    humilityScore: number;
  }) => void;
}

export function SuperheroForm({ onAddSuperhero }: SuperheroFormProps) {
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState<number | null>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSuperhero({ name, superpower, humilityScore: humilityScore ?? 0 });
    setName('');
    setSuperpower('');
    setHumilityScore(5);
  };

  const handleHumilityScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    const parsedValue = value === '' ? null : Number.parseInt(value);

    // If parsedValue is NaN, do not update the state
    if (parsedValue !== null && !isNaN(parsedValue)) {
      setHumilityScore(parsedValue);
    } else if (value === '') {
      setHumilityScore(null); // Allow empty string for reset
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Superhero Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="superpower"
        >
          Superpower
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="superpower"
          type="text"
          placeholder="Superpower"
          value={superpower}
          onChange={(e) => setSuperpower(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="humilityScore"
        >
          Humility Score (1-10)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="humilityScore"
          type="number"
          min="1"
          max="10"
          value={humilityScore ?? ''} // Allow empty value
          onChange={handleHumilityScoreChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Superhero
        </button>
      </div>
    </form>
  );
}
