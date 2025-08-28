import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from './RecipeCard';
import FavoriteRecipes from './FavoriteRecipes';
import RecipeSort from './RecipeSort';
import AddToWeeklyMenuDialog from './AddToWeeklyMenuDialog';
import { useAuth } from '@/contexts/AuthContext'; // Asume que tienes un contexto de autenticación
import { favoriteService } from '@/services/favoriteService';
//import { Recipe } from '@/types/menu';

// Define Recipe interface
interface Recipe {
  id: number;
  title: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
}



// Updated sample recipe data with macros and tags
const recipes: Recipe[] = [
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

const FeaturedRecipes = () => {

  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('all');
  const [addToMenuDialog, setAddToMenuDialog] = useState({
    isOpen: false,
    recipeTitle: '',
    recipeId: 0
  });
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { user, isAuthenticated } = useAuth();

  // Cargar favoritos cuando el usuario cambie
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Please log in to view your favorites</p>
      </div>
    );
  }

  const loadFavorites = async () => {
    try {
      const favorites = await favoriteService.getFavorites(user.id);
      setFavoriteIds(favorites.map(recipe => recipe.id));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleToggleFavorite = async (recipeId: number) => {
    if (!user) return;

    try {
      const isCurrentlyFavorite = favoriteIds.includes(recipeId);
      if (isCurrentlyFavorite) {
        await favoriteService.removeFavorite(user.id, recipeId);
        setFavoriteIds(prev => prev.filter(id => id !== recipeId));
      } else {
        await favoriteService.addFavorite(user.id, recipeId);
        setFavoriteIds(prev => [...prev, recipeId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filterAndSortRecipes = (recipesToFilter: Recipe[]) => {
    let filtered = [...recipesToFilter];

    // Filter by sort criteria
    if (sortBy !== 'all') {
      if (['breakfast', 'lunch', 'dinner', 'dessert'].includes(sortBy)) {
        filtered = filtered.filter(recipe => recipe.category.toLowerCase() === sortBy);
      } else {
        // Filter by tags
        const tagMap: { [key: string]: string; } = {
          'low-carb': 'low carb',
          'high-carb': 'high carb',
          'high-protein': 'high protein',
          'vegetarian': 'vegetarian',
          'high-fat': 'high fat'
        };
        const targetTag = tagMap[sortBy];
        if (targetTag) {
          filtered = filtered.filter(recipe => recipe.tags.includes(targetTag));
        }
      }
    }

    return filtered;
  };

  const handleAddToWeeklyMenu = (recipeId: number, recipeTitle: string) => {
    setAddToMenuDialog({
      isOpen: true,
      recipeTitle,
      recipeId
    });
  };

  const filteredRecipes = filterAndSortRecipes(recipes);

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recipes</h2>
        <button className="text-food-purple hover:underline font-medium">View All</button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex justify-between items-center">
            <RecipeSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                isFavorite={favoriteIds.includes(recipe.id)}
                onToggleFavorite={handleToggleFavorite}
                onAddToWeeklyMenu={handleAddToWeeklyMenu}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <FavoriteRecipes onAddToWeeklyMenu={handleAddToWeeklyMenu} />
        </TabsContent>
      </Tabs>

      <AddToWeeklyMenuDialog
        isOpen={addToMenuDialog.isOpen}
        onClose={() => setAddToMenuDialog({ isOpen: false, recipeTitle: '', recipeId: 0 })}
        recipeTitle={addToMenuDialog.recipeTitle}
        recipeId={addToMenuDialog.recipeId}
      />
    </section>
  );
};

export default FeaturedRecipes;
