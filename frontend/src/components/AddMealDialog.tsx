import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/menu';
import { recipes } from '@/data/recipes';

interface AddMealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (recipe: Recipe) => void;
  day: string;
  mealType: string;
}

const RecipeCard = ({
  recipe,
  onAdd,
  mealTypeDesc,
}: {
  recipe: Recipe;
  onAdd: (r: Recipe) => void;
  mealTypeDesc: string;
}) => (
  <div key={recipe.id} className="border rounded-lg overflow-hidden">
    <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover" />
    <div className="p-3">
      <h3 className="font-medium text-sm mb-2">{recipe.title}</h3>
      <div className="text-xs text-gray-600 mb-3">
        <p>{recipe.calories} calorías</p>
        <p>
          P: {recipe.protein}g | C: {recipe.carbs}g | G: {recipe.fat}g
        </p>
      </div>
      <Button size="sm" onClick={() => onAdd(recipe)} className="w-full">
        Agregar a {mealTypeDesc}
      </Button>
    </div>
  </div>
);

const AddMealDialog = ({ isOpen, onClose, onAddMeal, day, mealType }: AddMealDialogProps) => {
  const mealTypeDesc = mealType;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Agregar {mealTypeDesc} para {day}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAdd={onAddMeal}
              mealTypeDesc={mealTypeDesc}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealDialog;
