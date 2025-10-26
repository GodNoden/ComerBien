import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, AlertTriangle, CalendarDays, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import WeeklyMenuDay from '@/components/WeeklyMenuDay';
import AddMealDialog from '@/components/AddMealDialog';
import ShoppingListDialog from '@/components/ShoppingListDialog';
import { recipes } from '@/data/recipes';
import { Recipe, MealPlan, DayMeals } from '@/types/menu';

const WeeklyMenu = () => {
  const navigate = useNavigate();
  const [recommendedCalories, setRecommendedCalories] = useState<number>(0);
  const [mealPlan, setMealPlan] = useState<MealPlan>({
    Lunes: { desayuno: [], comida: [], cena: [], snack: [] },
    Martes: { desayuno: [], comida: [], cena: [], snack: [] },
    Miércoles: { desayuno: [], comida: [], cena: [], snack: [] },
    Jueves: { desayuno: [], comida: [], cena: [], snack: [] },
    Viernes: { desayuno: [], comida: [], cena: [], snack: [] },
    Sábado: { desayuno: [], comida: [], cena: [], snack: [] },
    Domingo: { desayuno: [], comida: [], cena: [], snack: [] }
  });

  const [addMealDialog, setAddMealDialog] = useState({
    isOpen: false,
    day: '',
    mealType: ''
  });

  const [shoppingListOpen, setShoppingListOpen] = useState(false);

  // Load user profile and meal plan data on component mount
  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setRecommendedCalories(profile.recommendedCalories || 0);
    }

    // Load existing meal plan from localStorage
    const savedMealPlan = localStorage.getItem('weeklyMealPlan');
    if (savedMealPlan) {
      const parsedMealPlan = JSON.parse(savedMealPlan);
      // Start with a complete week structure
      const convertedMealPlan: MealPlan = {
        Lunes: { desayuno: [], comida: [], cena: [], snack: [] },
        Martes: { desayuno: [], comida: [], cena: [], snack: [] },
        Miércoles: { desayuno: [], comida: [], cena: [], snack: [] },
        Jueves: { desayuno: [], comida: [], cena: [], snack: [] },
        Viernes: { desayuno: [], comida: [], cena: [], snack: [] },
        Sábado: { desayuno: [], comida: [], cena: [], snack: [] },
        Domingo: { desayuno: [], comida: [], cena: [], snack: [] }
      };

      // Only populate days that exist in saved data
      Object.entries(parsedMealPlan).forEach(([day, dayMeals]) => {
        if (convertedMealPlan[day as keyof MealPlan]) {
          Object.entries(dayMeals as any).forEach(([mealType, recipeIds]) => {
            if (Array.isArray(recipeIds)) {
              convertedMealPlan[day as keyof MealPlan][mealType as keyof DayMeals] = recipeIds
                .map((id: number) => recipes.find(recipe => recipe.id === id))
                .filter(Boolean) as Recipe[];
            }
          });
        }
      });

      setMealPlan(convertedMealPlan);
    }
  }, []);

  const addMeal = (recipe: Recipe) => {
    const { day, mealType } = addMealDialog;
    const updatedMealPlan = {
      ...mealPlan,
      [day]: {
        ...mealPlan[day as keyof MealPlan],
        [mealType]: [...mealPlan[day as keyof MealPlan][mealType as keyof DayMeals], recipe]
      }
    };

    setMealPlan(updatedMealPlan);

    // Also save to localStorage in the format expected by AddToWeeklyMenuDialog
    const mealPlanForStorage: any = {};
    Object.entries(updatedMealPlan).forEach(([dayKey, dayMeals]) => {
      mealPlanForStorage[dayKey] = {};
      Object.entries(dayMeals).forEach(([mealTypeKey, recipes]) => {
        mealPlanForStorage[dayKey][mealTypeKey] = recipes.map((recipe: Recipe) => recipe.id);
      });
    });
    localStorage.setItem('weeklyMealPlan', JSON.stringify(mealPlanForStorage));

    setAddMealDialog({ isOpen: false, day: '', mealType: '' });
  };

  const removeMeal = (day: string, mealType: string, recipeId: number) => {
    const updatedMealPlan = {
      ...mealPlan,
      [day]: {
        ...mealPlan[day as keyof MealPlan],
        [mealType]: mealPlan[day as keyof MealPlan][mealType as keyof DayMeals].filter(recipe => recipe.id !== recipeId)
      }
    };

    setMealPlan(updatedMealPlan);

    // Also update localStorage
    const mealPlanForStorage: any = {};
    Object.entries(updatedMealPlan).forEach(([dayKey, dayMeals]) => {
      mealPlanForStorage[dayKey] = {};
      Object.entries(dayMeals).forEach(([mealTypeKey, recipes]) => {
        mealPlanForStorage[dayKey][mealTypeKey] = recipes.map((recipe: Recipe) => recipe.id);
      });
    });
    localStorage.setItem('weeklyMealPlan', JSON.stringify(mealPlanForStorage));
  };

  const calculateDayTotals = (dayMeals: DayMeals) => {
    const allMeals = [...dayMeals.desayuno, ...dayMeals.comida, ...dayMeals.cena, ...dayMeals.snack];
    return allMeals.reduce(
      (totals, recipe) => ({
        calories: totals.calories + recipe.calories,
        protein: totals.protein + recipe.protein,
        carbs: totals.carbs + recipe.carbs,
        fat: totals.fat + recipe.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getMacroAlerts = (totals: { calories: number; protein: number; carbs: number; fat: number; }) => {
    const alerts = [];
    const totalMacros = totals.protein + totals.carbs + totals.fat;

    if (totalMacros > 0) {
      const proteinPercentage = (totals.protein / totalMacros) * 100;
      const carbsPercentage = (totals.carbs / totalMacros) * 100;
      const fatPercentage = (totals.fat / totalMacros) * 100;

      if (proteinPercentage > 60) {
        alerts.push({ type: 'protein', message: `High protein: ${Math.round(proteinPercentage)}%` });
      }
      if (carbsPercentage > 60) {
        alerts.push({ type: 'carbs', message: `High carbs: ${Math.round(carbsPercentage)}%` });
      }
      if (fatPercentage > 60) {
        alerts.push({ type: 'fat', message: `High fat: ${Math.round(fatPercentage)}%` });
      }
    }

    if (recommendedCalories > 0 && totals.calories > recommendedCalories) {
      alerts.push({
        type: 'calories',
        message: `Exceeds goal by ${totals.calories - recommendedCalories} cal`
      });
    }

    return alerts;
  };

  const generateShoppingList = () => {
    const allIngredients: string[] = [];

    Object.values(mealPlan).forEach((dayMeals: DayMeals) => {
      const allMeals = [...dayMeals.desayuno, ...dayMeals.comida, ...dayMeals.cena, ...dayMeals.snack];
      allMeals.forEach((recipe: Recipe) => {
        // Use ingredients if available, otherwise fall back to recipe title
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          allIngredients.push(...recipe.ingredients);
        } else {
          allIngredients.push(`Ingredientes para: ${recipe.title}`);
        }
      });
    });

    // Remove duplicates and return unique ingredients
    return [...new Set(allIngredients)];
  };

  const isCalorieExceeded = (dayCalories: number) => {
    return recommendedCalories > 0 && dayCalories > recommendedCalories;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with glass morphism effect */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-primary/10 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Menú Semanal</h1>
                <p className="text-sm text-muted-foreground">Planifica tus comidas para la semana</p>
              </div>
            </div>
            <Button
              onClick={() => setShoppingListOpen(true)}
              className="bg-gradient-to-r from-food-orange to-orange-500 hover:from-food-orange/90 hover:to-orange-500/90 shadow-lg hover:shadow-xl transition-all duration-200 hover-scale"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Lista de Compras
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Calorie Goal Alert with enhanced styling */}
        {recommendedCalories > 0 && (
          <div className="animate-fade-in">
            <Alert className="bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <AlertDescription className="text-primary font-medium">
                  <strong>Meta Calórica Diaria:</strong> {recommendedCalories} calorías
                  {' - '}
                  <button
                    onClick={() => navigate('/profile')}
                    className="story-link font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Ajustar en perfil
                  </button>
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}

        {/* Days Grid with staggered animation */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {Object.entries(mealPlan).map(([day, dayMeals], index) => {
            const totals = calculateDayTotals(dayMeals);
            const totalMacros = totals.protein + totals.carbs + totals.fat;
            const isExceeded = isCalorieExceeded(totals.calories);
            const alerts = getMacroAlerts(totals);
            const isEmpty = Object.values(dayMeals).every((meals: Recipe[]) => meals.length === 0);

            return (
              <div
                key={day}
                className="animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className={`h-fit backdrop-blur-sm border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group ${isEmpty
                  ? 'bg-gradient-to-br from-gray-50 to-white border-dashed border-2 border-gray-300 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10'
                  : 'bg-white/70'
                  }`}>
                  <CardHeader className={`pb-4 rounded-t-lg ${isEmpty
                    ? 'bg-gradient-to-b from-gray-100/50 to-transparent'
                    : 'bg-gradient-to-b from-primary/5 to-transparent'
                    }`}>
                    <CardTitle className={`text-lg text-center font-bold transition-colors ${isEmpty
                      ? 'text-gray-500 group-hover:text-primary'
                      : 'text-gray-900 group-hover:text-primary'
                      }`}>
                      {day}
                    </CardTitle>

                    {isEmpty ? (
                      /* Empty day display */
                      <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-3 group-hover:bg-primary/20 transition-all duration-200">
                          <CalendarDays className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-sm text-gray-500 mb-3">No hay comidas planeadas</div>
                        <Button
                          size="sm"
                          onClick={() => setAddMealDialog({ isOpen: true, day, mealType: 'desayuno' })}
                          className="bg-primary/10 hover:bg-primary text-primary hover:text-white border-none shadow-none transition-all duration-200"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar Primera Comida
                        </Button>
                      </div>
                    ) : (
                      /* Existing day display with meals */
                      <>
                        <div className="text-center">
                          <div className={`text-2xl font-bold transition-colors ${isExceeded ? 'text-red-500' : 'text-primary'}`}>
                            {totals.calories}
                            <span className="text-sm font-normal text-muted-foreground ml-1">cal</span>
                          </div>

                          {isExceeded && (
                            <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200 animate-scale-in">
                              <span className="text-xs text-red-600 font-medium flex items-center justify-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                +{totals.calories - recommendedCalories} cal over goal
                              </span>
                            </div>
                          )}
                        </div>

                        {totalMacros > 0 && (
                          <div className="space-y-2 mt-3">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <div className="font-semibold text-emerald-600">
                                  {Math.round((totals.protein / totalMacros) * 100)}%
                                </div>
                                <div className="text-emerald-600">Proteína</div>
                                <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${(totals.protein / totalMacros) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-amber-600">
                                  {Math.round((totals.carbs / totalMacros) * 100)}%
                                </div>
                                <div className="text-amber-600">Carbos</div>
                                <div className="w-full bg-amber-100 rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${(totals.carbs / totalMacros) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-purple-600">
                                  {Math.round((totals.fat / totalMacros) * 100)}%
                                </div>
                                <div className="text-purple-600">Grasa</div>
                                <div className="w-full bg-purple-100 rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${(totals.fat / totalMacros) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {alerts.length > 0 && (
                          <div className="space-y-2 mt-4">
                            {alerts.map((alert, alertIndex) => (
                              <Alert
                                key={alertIndex}
                                className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 py-2 animate-scale-in"
                                style={{ animationDelay: `${alertIndex * 0.1}s` }}
                              >
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                <AlertDescription className="text-amber-800 text-xs ml-2 font-medium">
                                  {alert.message}
                                </AlertDescription>
                              </Alert>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </CardHeader>

                  {!isEmpty && (
                    <CardContent className="pt-2">
                      <WeeklyMenuDay
                        day={day}
                        dayMeals={dayMeals}
                        onAddMeal={(mealType) => setAddMealDialog({ isOpen: true, day, mealType })}
                        onRemoveMeal={(mealType, recipeId) => removeMeal(day, mealType, recipeId)}
                      />
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>

        {Object.values(mealPlan).every((dayMeals: DayMeals) =>
          Object.values(dayMeals).every((meals: Recipe[]) => meals.length === 0)
        ) && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <CalendarDays className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comienza a Planificar tu Semana</h3>
              <p className="text-muted-foreground mb-4">Haz clic en los botones + para agregar comidas a tu menú semanal</p>
              <Button
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary/90"
              >
                Explorar Recetas
              </Button>
            </div>
          )}
      </div>

      <AddMealDialog
        isOpen={addMealDialog.isOpen}
        onClose={() => setAddMealDialog({ isOpen: false, day: '', mealType: '' })}
        onAddMeal={addMeal}
        day={addMealDialog.day}
        mealType={addMealDialog.mealType}
      />

      <ShoppingListDialog
        isOpen={shoppingListOpen}
        onClose={() => setShoppingListOpen(false)}
        ingredients={generateShoppingList()}
      />
    </div>
  );
};

export default WeeklyMenu;
