import React from 'react';
import RecipeCard from './RecipeCard';

import { recipes } from '@/data/recipes';

interface FavoriteRecipesProps {
    onAddToWeeklyMenu?: (recipeId: number, recipeTitle: string) => void;
}

const FavoriteRecipes = ({ onAddToWeeklyMenu }: FavoriteRecipesProps) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favoriteRecipes = recipes.filter(recipe => favoriteIds.includes(recipe.id));

    if (favoriteRecipes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aún no tienes recetas favoritas</p>
                <p className="text-gray-400 text-sm mt-2">Comienza agregando recetas a tus favoritas haciendo clic en el ícono del corazón</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    time={recipe.time}
                    difficulty={recipe.difficulty}
                    image={recipe.image}
                    category={recipe.category}
                    calories={recipe.calories}
                    protein={recipe.protein}
                    carbs={recipe.carbs}
                    fat={recipe.fat}
                    tags={recipe.tags}
                    onAddToWeeklyMenu={onAddToWeeklyMenu}
                />
            ))}
        </div>
    );
};

export default FavoriteRecipes;
