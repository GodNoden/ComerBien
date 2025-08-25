
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/types/menu.ts';

interface AddMealDialogProps {
    isOpen: boolean;
    onClose: () => void;
    recipes: Recipe[];
    onAddMeal: (recipe: Recipe) => void;
    day: string;
    mealType: string;
}

const AddMealDialog = ({ isOpen, onClose, recipes, onAddMeal, day, mealType }: AddMealDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Add {mealType} for {day}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="border rounded-lg overflow-hidden">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-medium text-sm mb-2">{recipe.title}</h3>
                                <div className="text-xs text-gray-600 mb-3">
                                    <p>{recipe.calories} calories</p>
                                    <p>P: {recipe.protein}g | C: {recipe.carbs}g | F: {recipe.fat}g</p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => onAddMeal(recipe)}
                                    className="w-full"
                                >
                                    Add to {mealType}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddMealDialog;
