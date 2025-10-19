
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { DayMeals, Recipe } from '@/types/menu';

interface WeeklyMenuDayProps {
  day: string;
  dayMeals: DayMeals;
  onAddMeal: (mealType: string) => void;
  onRemoveMeal: (mealType: string, recipeId: number) => void;
}

const WeeklyMenuDay = ({ day, dayMeals, onAddMeal, onRemoveMeal }: WeeklyMenuDayProps) => {
  const calculateDayTotals = () => {
    // Add null check for dayMeals
    if (!dayMeals) {
      return {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      };
    }

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(dayMeals).forEach(mealList => {
      if (Array.isArray(mealList)) {
        mealList.forEach(recipe => {
          totalCalories += recipe.calories;
          totalProtein += recipe.protein;
          totalCarbs += recipe.carbs;
          totalFat += recipe.fat;
        });
      }
    });

    const totalMacros = totalProtein + totalCarbs + totalFat;
    
    return {
      calories: totalCalories,
      protein: totalMacros > 0 ? Math.round((totalProtein / totalMacros) * 100) : 0,
      carbs: totalMacros > 0 ? Math.round((totalCarbs / totalMacros) * 100) : 0,
      fat: totalMacros > 0 ? Math.round((totalFat / totalMacros) * 100) : 0
    };
  };

  const dayTotals = calculateDayTotals();

  const renderMealSection = (mealType: 'desayuno' | 'comida' | 'cena' | 'snack', title: string) => {
    // Add null check for dayMeals and specific meal type
    const meals = dayMeals?.[mealType] || [];
    
    const getMealIcon = () => {
      switch (mealType) {
        case 'desayuno': return '';
        case 'comida': return '';
        case 'cena': return '';
        case 'snack': return '';
        default: return '🍽️';
      }
    };
    
    return (
      <div className="mb-6 animate-fade-in">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getMealIcon()}</span>
            <h4 className="font-semibold text-sm text-gray-800 capitalize">{title}</h4>
            {meals.length > 0 && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                {meals.length}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onAddMeal(mealType)}
            className="h-8 w-8 p-0 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all duration-200 hover-scale"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {meals.map((recipe, index) => (
            <div 
              key={`${recipe.id}-${index}`} 
              className="group flex items-center justify-between bg-gradient-to-r from-white to-gray-50 p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">
                  {recipe.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                    {recipe.calories} cal
                  </span>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">P: {recipe.protein}g</span>
                    <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">C: {recipe.carbs}g</span>
                    <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">F: {recipe.fat}g</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveMeal(mealType, recipe.id)}
                className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {meals.length === 0 && (
            <div className="text-center py-6 text-gray-400 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                 onClick={() => onAddMeal(mealType)}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs font-medium">Add {title.toLowerCase()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderMealSection('desayuno', 'Desayuno')}
      {renderMealSection('comida', 'Comida')}
      {renderMealSection('cena', 'Cena')}
      {renderMealSection('snack', 'Snack')}
    </div>
  );
};

export default WeeklyMenuDay;
