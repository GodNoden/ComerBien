
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';

interface AICalorieCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    onResult: (nutrition: { calories: number; protein: number; carbs: number; fat: number; }) => void;
    ingredients: string[];
}

const AICalorieCalculator = ({ isOpen, onClose, onResult, ingredients }: AICalorieCalculatorProps) => {
    const [customIngredients, setCustomIngredients] = useState(ingredients.join('\n'));
    const [loading, setLoading] = useState(false);

    const calculateNutrition = async () => {
        setLoading(true);

        // Simulate AI calculation - in real implementation, this would call an AI API
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock calculation based on ingredients
        const ingredientList = customIngredients.split('\n').filter(i => i.trim());
        const mockCalories = ingredientList.length * 50 + Math.random() * 200;
        const mockProtein = ingredientList.length * 3 + Math.random() * 10;
        const mockCarbs = ingredientList.length * 8 + Math.random() * 15;
        const mockFat = ingredientList.length * 2 + Math.random() * 8;

        const result = {
            calories: Math.round(mockCalories),
            protein: Math.round(mockProtein * 10) / 10,
            carbs: Math.round(mockCarbs * 10) / 10,
            fat: Math.round(mockFat * 10) / 10
        };

        setLoading(false);
        onResult(result);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-food-orange" />
                        AI Nutrition Calculator
                    </DialogTitle>
                    <DialogDescription>
                        Enter your ingredients and let AI calculate the nutrition information
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="ingredients-input">Ingredients (one per line)</Label>
                        <Textarea
                            id="ingredients-input"
                            value={customIngredients}
                            onChange={(e) => setCustomIngredients(e.target.value)}
                            placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1/2 cup butter"
                            rows={8}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={calculateNutrition}
                            disabled={loading || !customIngredients.trim()}
                            className="flex-1 bg-food-orange hover:bg-food-orange/90"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Calculate Nutrition
                                </>
                            )}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AICalorieCalculator;
