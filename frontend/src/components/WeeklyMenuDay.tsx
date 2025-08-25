
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

    const renderMealSection = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', title: string) => {
        // Add null check for dayMeals and specific meal type
        const meals = dayMeals?.[mealType] || [];

        return (
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm text-gray-700 capitalize">{title}</h4>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onAddMeal(mealType)}
                        className="h-6 w-6 p-0"
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
                <div className="space-y-2">
                    {meals.map((recipe, index) => (
                        <div key={`${recipe.id}-${index}`} className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs">
                            <div className="flex-1">
                                <p className="font-medium truncate">{recipe.title}</p>
                                <p className="text-gray-500">{recipe.calories} cal</p>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onRemoveMeal(mealType, recipe.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                                <Trash className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                    {meals.length === 0 && (
                        <div className="text-xs text-gray-400 italic p-2">No meals planned</div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {renderMealSection('breakfast', 'Breakfast')}
            {renderMealSection('lunch', 'Lunch')}
            {renderMealSection('dinner', 'Dinner')}
            {renderMealSection('snack', 'Snack')}
        </div>
    );
};

export default WeeklyMenuDay;
