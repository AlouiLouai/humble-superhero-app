'use client';
import { useSuperhero } from '@/hooks/useSuperhero';
import { SuperheroForm } from './SuperHeroForm';
import { SuperheroList } from './SuperHeroList';
import React from 'react';

export function SuperHeroMain() {
  const { superheroes, loading, error, successMessage, addSuperhero } =
    useSuperhero();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Humble Superhero API
      </h1>

      <SuperheroForm onAddSuperhero={addSuperhero} />

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <SuperheroList superheroes={superheroes} />
      )}
    </main>
  );
}
