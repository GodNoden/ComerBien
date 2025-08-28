import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from './RecipeCard';
import FavoriteRecipes from './FavoriteRecipes';
import RecipeSort from './RecipeSort';
import AddToWeeklyMenuDialog from './AddToWeeklyMenuDialog';

// Updated sample recipe data with macros and tags
const recipes = [
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
  },
  // NEW RECIPES ADDED
  {
    id: 7,
    title: 'Quinoa Buddha Bowl',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000',
    category: 'Lunch',
    calories: 380,
    protein: 16,
    carbs: 45,
    fat: 14,
    tags: ['vegetarian', 'high protein', 'high carb']
  },
  {
    id: 8,
    title: 'Grilled Chicken Caesar Salad',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1000',
    category: 'Lunch',
    calories: 320,
    protein: 28,
    carbs: 8,
    fat: 18,
    tags: ['high protein', 'low carb']
  },
  {
    id: 9,
    title: 'Overnight Chia Pudding',
    time: '5 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000',
    category: 'Breakfast',
    calories: 250,
    protein: 8,
    carbs: 22,
    fat: 15,
    tags: ['vegetarian', 'high fat']
  },
  {
    id: 10,
    title: 'Spicy Thai Basil Stir Fry',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?q=80&w=1000',
    category: 'Dinner',
    calories: 420,
    protein: 25,
    carbs: 35,
    fat: 20,
    tags: ['high protein', 'high carb']
  },
  {
    id: 11,
    title: 'Protein Energy Balls',
    time: '10 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000',
    category: 'Snack',
    calories: 160,
    protein: 8,
    carbs: 12,
    fat: 9,
    tags: ['vegetarian', 'high protein']
  },
  {
    id: 12,
    title: 'Mediterranean Stuffed Peppers',
    time: '40 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1594737791203-c519cd2faa16?q=80&w=1000',
    category: 'Dinner',
    calories: 290,
    protein: 18,
    carbs: 32,
    fat: 12,
    tags: ['vegetarian', 'high protein']
  },
  {
    id: 13,
    title: 'Avocado Toast with Poached Egg',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1000',
    category: 'Breakfast',
    calories: 310,
    protein: 16,
    carbs: 24,
    fat: 18,
    tags: ['vegetarian', 'high fat', 'high protein']
  },
  {
    id: 14,
    title: 'Lemon Herb Baked Cod',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?q=80&w=1000',
    category: 'Dinner',
    calories: 220,
    protein: 32,
    carbs: 3,
    fat: 8,
    tags: ['high protein', 'low carb']
  },
  {
    id: 15,
    title: 'Sweet Potato Black Bean Tacos',
    time: '30 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000',
    category: 'Lunch',
    calories: 350,
    protein: 14,
    carbs: 52,
    fat: 10,
    tags: ['vegetarian', 'high carb']
  },
  {
    id: 16,
    title: 'Banana Walnut Smoothie Bowl',
    time: '10 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1000',
    category: 'Breakfast',
    calories: 380,
    protein: 12,
    carbs: 48,
    fat: 16,
    tags: ['vegetarian', 'high carb', 'high fat']
  },
  {
    id: 17,
    title: 'Garlic Herb Roasted Chicken',
    time: '1 hour',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1000',
    category: 'Dinner',
    calories: 480,
    protein: 38,
    carbs: 8,
    fat: 32,
    tags: ['high protein', 'high fat', 'low carb']
  },
  {
    id: 18,
    title: 'Coconut Curry Lentil Soup',
    time: '35 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000',
    category: 'Lunch',
    calories: 280,
    protein: 18,
    carbs: 38,
    fat: 8,
    tags: ['vegetarian', 'high protein', 'high carb']
  },
  {
    id: 19,
    title: 'Dark Chocolate Protein Brownies',
    time: '35 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000',
    category: 'Dessert',
    calories: 200,
    protein: 12,
    carbs: 16,
    fat: 10,
    tags: ['vegetarian', 'high protein']
  },
  {
    id: 20,
    title: 'Asian Lettuce Wraps',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1604467707321-70d5ac45adda?q=80&w=1000',
    category: 'Lunch',
    calories: 240,
    protein: 22,
    carbs: 12,
    fat: 12,
    tags: ['high protein', 'low carb']
  },
  {
    id: 21,
    title: 'Almond Flour Pancakes',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1000',
    category: 'Breakfast',
    calories: 290,
    protein: 14,
    carbs: 8,
    fat: 22,
    tags: ['high protein', 'low carb', 'high fat']
  },
  {
    id: 22,
    title: 'Stuffed Portobello Mushrooms',
    time: '30 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1000',
    category: 'Dinner',
    calories: 260,
    protein: 16,
    carbs: 18,
    fat: 14,
    tags: ['vegetarian', 'high protein']
  },
  {
    id: 23,
    title: 'Greek Chicken Bowls',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?q=80&w=1000',
    category: 'Lunch',
    calories: 420,
    protein: 32,
    carbs: 28,
    fat: 20,
    tags: ['high protein', 'high carb']
  },
  {
    id: 24,
    title: 'Keto Cauliflower Mac and Cheese',
    time: '40 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1000',
    category: 'Dinner',
    calories: 340,
    protein: 18,
    carbs: 12,
    fat: 26,
    tags: ['vegetarian', 'low carb', 'high fat']
  },
  {
    id: 25,
    title: 'Trail Mix Granola Bars',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1000',
    category: 'Snack',
    calories: 220,
    protein: 8,
    carbs: 28,
    fat: 9,
    tags: ['vegetarian', 'high carb']
  },
  {
    id: 26,
    title: 'Vanilla Bean Panna Cotta',
    time: '4 hours',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1000',
    category: 'Dessert',
    calories: 280,
    protein: 6,
    carbs: 22,
    fat: 18,
    tags: ['vegetarian', 'high fat']
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

  // Get user profile for personalized recipe recommendations
  const getUserProfile = () => {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  };

  const calculateUserBMI = (height: string, weight: string) => {
    if (!height || !weight) return null;
    const heightM = parseFloat(height) / 100; // convert cm to meters
    const weightKg = parseFloat(weight);
    return weightKg / (heightM * heightM);
  };

  const getPersonalizedScore = (recipe: any, userProfile: any) => {
    if (!userProfile?.personalInfo) return 0;
    
    const { weightGoal, gender, activityLevel, height, weight } = userProfile.personalInfo;
    const bmi = calculateUserBMI(height, weight);
    let score = 0;

    // Check for allergens and dislikes first - apply heavy penalties
    if (userProfile.allergies?.length > 0) {
      const hasAllergen = userProfile.allergies.some((allergen: string) => 
        recipe.title.toLowerCase().includes(allergen.toLowerCase()) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(allergen.toLowerCase()))
      );
      if (hasAllergen) {
        score -= 1000; // Heavy penalty to push to bottom
      }
    }

    if (userProfile.dislikes?.length > 0) {
      const hasDislike = userProfile.dislikes.some((dislike: string) => 
        recipe.title.toLowerCase().includes(dislike.toLowerCase()) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(dislike.toLowerCase()))
      );
      if (hasDislike) {
        score -= 500; // Moderate penalty for dislikes
      }
    }

    // Base scoring on weight goal
    if (weightGoal === 'lose') {
      // Prioritize high protein, lower calories
      score += (recipe.protein / recipe.calories) * 100; // Protein efficiency
      score += recipe.calories < 300 ? 30 : recipe.calories < 400 ? 20 : 10;
      score += recipe.tags.includes('low carb') ? 20 : 0;
      score += recipe.tags.includes('high protein') ? 25 : 0;
    } else if (weightGoal === 'gain') {
      // Prioritize higher calories and balanced macros
      score += recipe.calories > 400 ? 30 : recipe.calories > 300 ? 20 : 10;
      score += recipe.protein > 20 ? 25 : 15;
      score += recipe.tags.includes('high protein') ? 20 : 0;
      score += recipe.tags.includes('high fat') ? 15 : 0;
    } else {
      // Maintenance - balanced approach
      score += recipe.calories >= 250 && recipe.calories <= 450 ? 25 : 15;
      score += recipe.protein > 15 ? 20 : 10;
    }

    // Activity level considerations
    if (activityLevel === 'very' || activityLevel === 'extreme') {
      score += recipe.carbs > 30 ? 15 : 10; // Higher carbs for active people
      score += recipe.protein > 25 ? 20 : 15; // More protein for recovery
    }

    // Gender-specific adjustments
    if (gender === 'male') {
      score += recipe.calories > 350 ? 10 : 5; // Generally higher calorie needs
      score += recipe.protein > 25 ? 15 : 10;
    } else {
      score += recipe.calories >= 250 && recipe.calories <= 400 ? 10 : 5;
      score += recipe.protein > 20 ? 15 : 10;
    }

    // BMI considerations
    if (bmi) {
      if (bmi < 18.5) { // Underweight
        score += recipe.calories > 400 ? 20 : 10;
        score += recipe.tags.includes('high fat') ? 15 : 0;
      } else if (bmi > 25) { // Overweight
        score += recipe.calories < 350 ? 20 : 10;
        score += recipe.tags.includes('low carb') ? 15 : 0;
      }
    }

    return score;
  };

  const filterAndSortRecipes = (recipeList: typeof recipes) => {
    let filtered = [...recipeList];
    const userProfile = getUserProfile();

    // Apply personalized scoring if profile exists
    if (userProfile?.personalInfo?.weightGoal) {
      // Calculate personalized scores for each recipe (includes allergen/dislike penalties)
      const recipesWithScores = filtered.map(recipe => ({
        ...recipe,
        personalizedScore: getPersonalizedScore(recipe, userProfile)
      }));

      // Sort by personalized score (highest first - allergens/dislikes will be at the bottom)
      recipesWithScores.sort((a, b) => b.personalizedScore - a.personalizedScore);
      filtered = recipesWithScores;
    }

    // Apply additional sort criteria
    if (sortBy !== 'all') {
      if (['breakfast', 'lunch', 'dinner', 'dessert'].includes(sortBy)) {
        filtered = filtered.filter(recipe => recipe.category.toLowerCase() === sortBy);
      } else {
        // Filter by tags
        const tagMap: { [key: string]: string } = {
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
  const userProfile = getUserProfile();

  const getRecommendationHeader = () => {
    if (!userProfile?.personalInfo?.weightGoal) return "Recipes";
    
    const { weightGoal } = userProfile.personalInfo;
    if (weightGoal === 'lose') return "Weight Loss Recipes";
    if (weightGoal === 'gain') return "Weight Gain Recipes";
    return "Recipes for You";
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getRecommendationHeader()}</h2>
          {userProfile?.personalInfo?.weightGoal && (
            <p className="text-sm text-gray-600 mt-1">
              Personalized for your {userProfile.personalInfo.weightGoal === 'lose' ? 'weight loss' : 
                userProfile.personalInfo.weightGoal === 'gain' ? 'weight gain' : 'maintenance'} goal
            </p>
          )}
        </div>
        <button className="text-primary hover:underline font-medium">View All</button>
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
