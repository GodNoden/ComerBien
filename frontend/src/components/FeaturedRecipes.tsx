import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from './RecipeCard';
import FavoriteRecipes from './FavoriteRecipes';
import RecipeSort from './RecipeSort';
import AddToWeeklyMenuDialog from './AddToWeeklyMenuDialog';
import { recipes } from '@/data/recipes';

const FeaturedRecipes = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [sortBy, setSortBy] = useState('todas');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [addToMenuDialog, setAddToMenuDialog] = useState({
    isOpen: false,
    recipeTitle: '',
    recipeId: 0
  });

  useEffect(() => {
    const loadUserProfile = () => {
      const profile = localStorage.getItem('userProfile');
      setUserProfile(profile ? JSON.parse(profile) : null);
    };

    loadUserProfile();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userProfile') {
        loadUserProfile();
      }
    };

    const handleProfileUpdate = () => {
      loadUserProfile();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const getUserProfile = () => {
    return userProfile;
  };

  const calculateUserBMI = (height: string, weight: string) => {
    if (!height || !weight) return null;
    const heightM = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    return weightKg / (heightM * heightM);
  };

  const getPersonalizedScore = (recipe: any, userProfile: any) => {
    if (!userProfile?.personalInfo) return 0;

    const { weightGoal, gender, activityLevel, height, weight } = userProfile.personalInfo;
    const bmi = calculateUserBMI(height, weight);
    let score = 0;

    if (userProfile.allergies?.length > 0) {
      const hasAllergen = userProfile.allergies.some((allergen: string) =>
        recipe.title.toLowerCase().includes(allergen.toLowerCase()) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(allergen.toLowerCase()))
      );
      if (hasAllergen) {
        score -= 1000;
      }
    }

    if (userProfile.dislikes?.length > 0) {
      const hasDislike = userProfile.dislikes.some((dislike: string) =>
        recipe.title.toLowerCase().includes(dislike.toLowerCase()) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(dislike.toLowerCase()))
      );
      if (hasDislike) {
        score -= 500;
      }
    }

    if (weightGoal === 'perder') {
      score += (recipe.protein / recipe.calories) * 100;
      score += recipe.calories < 300 ? 30 : recipe.calories < 400 ? 20 : 10;
      score += recipe.tags.includes('bajo en carbos') ? 20 : 0;
      score += recipe.tags.includes('alto en proteína') ? 25 : 0;
    } else if (weightGoal === 'ganar') {
      
      score += recipe.calories > 400 ? 30 : recipe.calories > 300 ? 20 : 10;
      score += recipe.protein > 20 ? 25 : 15;
      score += recipe.tags.includes('alto en proteína') ? 20 : 0;
      score += recipe.tags.includes('alto en grasa') ? 15 : 0;
    } else {
      
      score += recipe.calories >= 250 && recipe.calories <= 450 ? 25 : 15;
      score += recipe.protein > 15 ? 20 : 10;
    }


    if (activityLevel === 'muy' || activityLevel === 'extremo') {
      score += recipe.carbs > 30 ? 15 : 10;
      score += recipe.protein > 25 ? 20 : 15;
    }

    
    if (gender === 'masculino') {
      score += recipe.calories > 350 ? 10 : 5;
      score += recipe.protein > 25 ? 15 : 10;
    } else {
      score += recipe.calories >= 250 && recipe.calories <= 400 ? 10 : 5;
      score += recipe.protein > 20 ? 15 : 10;
    }

    
    if (bmi) {
      if (bmi < 18.5) {
        score += recipe.calories > 400 ? 20 : 10;
        score += recipe.tags.includes('alto en grasa') ? 15 : 0;
      } else if (bmi > 25) {
        score += recipe.calories < 350 ? 20 : 10;
        score += recipe.tags.includes('bajo en carbos') ? 15 : 0;
      }
    }

    return score;
  };

  const filterAndSortRecipes = (recipeList: typeof recipes) => {
    let filtered = [...recipeList];
    const userProfile = getUserProfile();

    
    if (userProfile?.personalInfo?.weightGoal) {
      const recipesWithScores = filtered.map(recipe => ({
        ...recipe,
        personalizedScore: getPersonalizedScore(recipe, userProfile)
      }));

      recipesWithScores.sort((a, b) => b.personalizedScore - a.personalizedScore);
      filtered = recipesWithScores;
    }

    if (sortBy !== 'todas') {
      if (['desayuno', 'comida', 'cena', 'snack'].includes(sortBy)) {
        filtered = filtered.filter(recipe => recipe.category.toLowerCase() === sortBy);
      } else {
        const tagMap: { [key: string]: string; } = {
          'bajo-carbos': 'bajo en carbos',
          'alto-carbos': 'alto en carbos',
          'alto-proteina': 'alto en proteína',
          'vegetariano': 'vegetariano',
          'alto-grasa': 'alto en grasa'
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

  const getRecommendationHeader = () => {
    if (!userProfile?.personalInfo?.weightGoal) {
      return "Recetas Mexicanas Destacadas";
    }

    const { weightGoal } = userProfile.personalInfo;
    switch (weightGoal) {
      case 'perder':
        return "Recetas Recomendadas para Pérdida de Peso";
      case 'ganar':
        return "Recetas Recomendadas para Ganancia de Peso";
      case 'mantener':
        return "Recetas Recomendadas para Mantenimiento";
      default:
        return "Recetas Mexicanas Destacadas";
    }
  };

  return (
    <div className="py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="favoritas">Favoritas</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <RecipeSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        <TabsContent value="todas" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Todas las Recetas Mexicanas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  onAddToWeeklyMenu={handleAddToWeeklyMenu}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recomendadas" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{getRecommendationHeader()}</h2>
            {userProfile?.personalInfo?.weightGoal && (
              <p className="text-gray-600 mb-4">
                Basado en tu objetivo: {userProfile.personalInfo.weightGoal === 'perder' ? 'Perder peso' :
                  userProfile.personalInfo.weightGoal === 'ganar' ? 'Ganar peso' : 'Mantener peso'}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.slice(0, 12).map((recipe) => (
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

        <TabsContent value="recientes" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Recetas Vistas Recientemente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecipes.slice(0, 8).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                  onAddToWeeklyMenu={handleAddToWeeklyMenu}
                />
              ))}
            </div>
          </div>
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