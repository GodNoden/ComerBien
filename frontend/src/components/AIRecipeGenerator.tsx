
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Loader2 } from 'lucide-react';

interface AIRecipeGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    onResult: (recipe: unknown) => void;
}

const AIRecipeGenerator = ({ isOpen, onClose, onResult }: AIRecipeGeneratorProps) => {
    const [prompt, setPrompt] = useState('');
    const [category, setCategory] = useState('');
    const [dietary, setDietary] = useState('');
    const [loading, setLoading] = useState(false);

    const generateRecipe = async () => {
        setLoading(true);

        // Simulate AI generation - in real implementation, this would call an AI API
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mock recipe generation based on prompt
        const mockRecipe = {
            title: `AI Generated ${prompt || 'Recipe'}`,
            category: category || 'dinner',
            time: '30 minutes',
            complexity: 'medium',
            calories: 350,
            protein: 25,
            carbs: 40,
            fat: 12,
            description: `A delicious ${prompt.toLowerCase() || 'recipe'} that's perfect for any occasion.`,
            ingredients: [
                '2 cups of main ingredient',
                '1 cup of secondary ingredient',
                '2 tablespoons of seasoning',
                'Salt and pepper to taste'
            ],
            steps: [
                'Prepare all ingredients by washing and chopping as needed.',
                'Heat a large pan over medium heat and add oil.',
                'Cook the main ingredients until tender and golden.',
                'Season with salt, pepper, and other spices.',
                'Serve hot and enjoy!'
            ],
            tags: ['ai-generated', 'quick', 'easy']
        };

        setLoading(false);
        onResult(mockRecipe);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-food-purple" />
                        AI Recipe Generator
                    </DialogTitle>
                    <DialogDescription>
                        Describe what kind of recipe you want and let AI create it for you
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="recipe-prompt">What kind of recipe do you want?</Label>
                        <Textarea
                            id="recipe-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A healthy pasta dish with vegetables, or a quick breakfast smoothie"
                            rows={3}
                            className="mt-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="ai-category">Preferred Category</Label>
                            <Select onValueChange={setCategory}>
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Any category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="breakfast">Breakfast</SelectItem>
                                    <SelectItem value="lunch">Lunch</SelectItem>
                                    <SelectItem value="dinner">Dinner</SelectItem>
                                    <SelectItem value="snack">Snack</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="dietary">Dietary Preferences</Label>
                            <Select onValueChange={setDietary}>
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Any diet" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                    <SelectItem value="vegan">Vegan</SelectItem>
                                    <SelectItem value="keto">Keto</SelectItem>
                                    <SelectItem value="low-carb">Low Carb</SelectItem>
                                    <SelectItem value="high-protein">High Protein</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={generateRecipe}
                            disabled={loading || !prompt.trim()}
                            className="flex-1 bg-food-purple hover:bg-food-purple/90"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Bot className="h-4 w-4 mr-2" />
                                    Generate Recipe
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

export default AIRecipeGenerator;
