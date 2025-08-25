import React from 'react';
import RecipeCard from './RecipeCard';

// This would come from the same data source as FeaturedRecipes in a real app
const allRecipes = [
    {
        id: 1,
        title: 'Greek Yogurt Pancakes',
        time: '20 mins',
        difficulty: 'easy' as const,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000',
        category: 'Breakfast',
        calories: 220,
        protein: 12,
        carbs: 28,
        fat: 8,
        tags: ['high protein', 'vegetarian']
    },
    {
        id: 2,
        title: 'Teriyaki Salmon Bowl',
        time: '30 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000',
        category: 'Lunch',
        calories: 450,
        protein: 35,
        carbs: 42,
        fat: 15,
        tags: ['high protein', 'low carb']
    },
    {
        id: 3,
        title: 'Margherita Pizza',
        time: '45 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1000',
        category: 'Dinner',
        calories: 285,
        protein: 12,
        carbs: 34,
        fat: 13,
        tags: ['vegetarian', 'high carb']
    },
    {
        id: 4,
        title: 'Chocolate Avocado Mousse',
        time: '15 mins',
        difficulty: 'easy' as const,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000',
        category: 'Dessert',
        calories: 180,
        protein: 3,
        carbs: 18,
        fat: 12,
        tags: ['vegetarian', 'high fat', 'low carb']
    },
    {
        id: 5,
        title: 'Shakshuka',
        time: '25 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000',
        category: 'Breakfast',
        calories: 240,
        protein: 14,
        carbs: 18,
        fat: 13,
        tags: ['vegetarian', 'high protein']
    },
    {
        id: 6,
        title: 'Beef Wellington',
        time: '2 hours',
        difficulty: 'hard' as const,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000',
        category: 'Dinner',
        calories: 650,
        protein: 42,
        carbs: 28,
        fat: 40,
        tags: ['high protein', 'high fat']
    }
];

interface FavoriteRecipesProps {
    onAddToWeeklyMenu?: (recipeId: number, recipeTitle: string) => void;
}

const FavoriteRecipes = ({ onAddToWeeklyMenu }: FavoriteRecipesProps) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const favoriteRecipes = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));

    if (favoriteRecipes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No favorite recipes yet</p>
                <p className="text-gray-400 text-sm mt-2">Start adding recipes to your favorites by clicking the heart icon</p>
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
