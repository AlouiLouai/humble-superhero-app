'use client';

import { useState, useEffect } from 'react';
import { Superhero } from '@/types/Superhero';
import { SuperheroService } from '@/services/superhero.service';

export function useSuperhero() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    loadSuperheroes();
  }, []);

  const loadSuperheroes = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await SuperheroService.fetchSuperheroes();
      setSuperheroes(data);
    } catch (err) {
      setError('Failed to load superheroes. Please try again.');
      console.error('Error fetching superheroes:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSuperhero = async (newSuperhero: Omit<Superhero, 'id'>) => {
    setError(null);

    try {
      const addedSuperhero = await SuperheroService.addSuperhero(newSuperhero);
      setSuperheroes((prev) =>
        [...prev, addedSuperhero].sort(
          (a, b) => b.humilityScore - a.humilityScore,
        ),
      );
      setSuccessMessage('Superhero added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add superhero. Please try again.');
      console.error('Error adding superhero:', err);
    }
  };

  return { superheroes, loading, error, successMessage, addSuperhero };
}
