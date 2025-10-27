import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from './RecipeCard';
import FavoriteRecipes from './FavoriteRecipes';
import RecipeSort from './RecipeSort';
import AddToWeeklyMenuDialog from './AddToWeeklyMenuDialog';
import { useRecipes } from '@/hooks/useRecipes';
import { useAuth } from '@/contexts/AuthContext';
import { RecipeResponse, Tag, MealCategory } from '@/types';

const FeaturedRecipes = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [sortBy, setSortBy] = useState('todas');
  const [addToMenuDialog, setAddToMenuDialog] = useState({
    isOpen: false,
    recipeTitle: '',
    recipeId: 0
  });

  const { recipes, loading, error } = useRecipes();
  const { user, isLoggedIn } = useAuth();

  const handleAddToWeeklyMenu = (recipeId: number, recipeTitle: string) => {
    setAddToMenuDialog({
      isOpen: true,
      recipeTitle,
      recipeId
    });
  };

  // Función simplificada de filtrado y ordenamiento
  const filterAndSortRecipes = (recipeList: RecipeResponse[]) => {
    let filtered = [...recipeList];

    // Filtrar por categoría o tag
    if (sortBy !== 'todas') {
      // Mapeo de filtros del frontend a enums del backend
      const categoryMap: { [key: string]: MealCategory; } = {
        'desayuno': MealCategory.DESAYUNO,
        'comida': MealCategory.COMIDA,
        'cena': MealCategory.CENA,
        'snack': MealCategory.SNACK
      };

      const tagMap: { [key: string]: Tag; } = {
        'bajo-carbos': Tag.BAJO_EN_CARBOS,
        'alto-proteina': Tag.ALTA_PROTEINA,
        'vegetariano': Tag.VEGETARIANA,
        'vegano': Tag.VEGANA,
        'gluten-free': Tag.GLUTEN_FREE,
        'dairy-free': Tag.SIN_LACTOSA,
        'keto': Tag.KETO,
        'bajo-calorias': Tag.BAJO_EN_CALORIAS
      };

      const targetCategory = categoryMap[sortBy];
      const targetTag = tagMap[sortBy];

      if (targetCategory) {
        filtered = filtered.filter(recipe => recipe.category === targetCategory);
      } else if (targetTag) {
        filtered = filtered.filter(recipe => recipe.tags.includes(targetTag));
      }
    }

    return filtered;
  };

  const filteredRecipes = filterAndSortRecipes(recipes);

  const getRecommendationHeader = () => {
    if (!user?.dietaryPreferences || user.dietaryPreferences.length === 0) {
      return "Recetas Mexicanas Destacadas";
    }

    const preferences = user.dietaryPreferences.join(', ').toLowerCase();
    return `Recetas Recomendadas (${preferences})`;
  };

  // Mostrar estados de carga y error
  if (loading) {
    return (
      <div className="py-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-gray-600">Cargando recetas...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="favoritas">Favoritas</TabsTrigger>
            {isLoggedIn && (
              <TabsTrigger value="recomendadas">Recomendadas</TabsTrigger>
            )}
          </TabsList>

          <div className="flex gap-2">
            <RecipeSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        <TabsContent value="todas" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isLoggedIn ? 'Todas las Recetas Disponibles' : 'Recetas Públicas Mexicanas'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  onAddToWeeklyMenu={handleAddToWeeklyMenu}
                />
              ))}
            </div>
            {filteredRecipes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron recetas con los filtros seleccionados.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recomendadas" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{getRecommendationHeader()}</h2>
            {user?.dietaryPreferences && user.dietaryPreferences.length > 0 && (
              <p className="text-gray-600 mb-4">
                Basado en tus preferencias dietéticas
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes
                .filter(recipe => {
                  // Filtrar recetas que coincidan con las preferencias del usuario
                  if (!user?.dietaryPreferences) return false;
                  return user.dietaryPreferences.some(pref =>
                    recipe.tags.includes(pref)
                  );
                })
                .slice(0, 12)
                .map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    onAddToWeeklyMenu={handleAddToWeeklyMenu}
                  />
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="favoritas">
          <FavoriteRecipes onAddToWeeklyMenu={handleAddToWeeklyMenu} />
        </TabsContent>
      </Tabs>

      <AddToWeeklyMenuDialog
        isOpen={addToMenuDialog.isOpen}
        onClose={() => setAddToMenuDialog({ isOpen: false, recipeTitle: '', recipeId: 0 })}
        recipeTitle={addToMenuDialog.recipeTitle}
        recipeId={addToMenuDialog.recipeId}
      />
    </div>
  );
};

export default FeaturedRecipes;