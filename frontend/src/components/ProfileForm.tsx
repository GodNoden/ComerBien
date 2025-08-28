// components/ProfileForm.tsx
import React, { useState } from 'react';
import { recommendationService } from '@/services/recommendationService';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types/menu';
import RecipeCard from './RecipeCard';

const ProfileForm = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState('maintain');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(1.75);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recs = await recommendationService.getRecommendations(goal, weight, height);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Perfil y Objetivos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Objetivo:</label>
          <select 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="lose">Bajar peso</option>
            <option value="maintain">Mantener peso</option>
            <option value="gain">Subir peso</option>
          </select>
        </div>
        <div>
          <label className="block">Peso (kg):</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(parseFloat(e.target.value))} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Altura (m):</label>
          <input 
            type="number" 
            step="0.01"
            value={height} 
            onChange={(e) => setHeight(parseFloat(e.target.value))} 
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-food-purple text-white p-2 rounded">
          Obtener Recomendaciones
        </button>
      </form>
      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Recetas Recomendadas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map(recipe => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;