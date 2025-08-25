
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload, Sparkles, Bot } from 'lucide-react';
import Header from '@/components/Header';
import AICalorieCalculator from '@/components/AICalorieCalculator';
import AIRecipeGenerator from '@/components/AIRecipeGenerator';

const AddRecipe = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        category: '',
        time: '',
        complexity: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        description: ''
    });
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [steps, setSteps] = useState<string[]>(['']);
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [showAICalculator, setShowAICalculator] = useState(false);
    const [showAIGenerator, setShowAIGenerator] = useState(false);

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const updateIngredient = (index: number, value: string) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    const updateStep = (index: number, value: string) => {
        const updated = [...steps];
        updated[index] = value;
        setSteps(updated);
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Recipe data:', {
            ...formData,
            ingredients: ingredients.filter(i => i.trim()),
            steps: steps.filter(s => s.trim()),
            tags
        });
        // Here you would typically save the recipe
        navigate('/');
    };

    const handleAICalorieResult = (nutrition: { calories: number; protein: number; carbs: number; fat: number; }) => {
        setFormData(prev => ({
            ...prev,
            calories: nutrition.calories.toString(),
            protein: nutrition.protein.toString(),
            carbs: nutrition.carbs.toString(),
            fat: nutrition.fat.toString()
        }));
        setShowAICalculator(false);
    };

    const handleAIRecipeResult = (recipe: any) => {
        setFormData(prev => ({
            ...prev,
            title: recipe.title,
            category: recipe.category,
            time: recipe.time,
            complexity: recipe.complexity,
            calories: recipe.calories?.toString() || '',
            protein: recipe.protein?.toString() || '',
            carbs: recipe.carbs?.toString() || '',
            fat: recipe.fat?.toString() || '',
            description: recipe.description || ''
        }));
        setIngredients(recipe.ingredients || ['']);
        setSteps(recipe.steps || ['']);
        setTags(recipe.tags || []);
        setShowAIGenerator(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                    <h1 className="text-3xl font-bold text-food-purple">Add New Recipe</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* AI Assistance */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-food-purple" />
                                AI Assistance
                            </CardTitle>
                            <CardDescription>
                                Let AI help you with nutrition calculation or complete recipe generation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Button
                                onClick={() => setShowAICalculator(true)}
                                className="bg-food-orange hover:bg-food-orange/90"
                            >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Calculate Nutrition with AI
                            </Button>
                            <Button
                                onClick={() => setShowAIGenerator(true)}
                                className="bg-food-purple hover:bg-food-purple/90"
                            >
                                <Bot className="h-4 w-4 mr-2" />
                                Generate Recipe with AI
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Recipe Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter recipe title"
                                />
                            </div>

                            <div>
                                <Label htmlFor="image">Recipe Image</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('image')?.click()}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload Image
                                    </Button>
                                    {formData.image && (
                                        <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded" />
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="breakfast">Breakfast</SelectItem>
                                        <SelectItem value="lunch">Lunch</SelectItem>
                                        <SelectItem value="dinner">Dinner</SelectItem>
                                        <SelectItem value="snack">Snack</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="time">Cooking Time</Label>
                                    <Input
                                        id="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                        placeholder="e.g., 30 minutes"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="complexity">Complexity</Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select complexity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Brief description of the recipe"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Nutrition Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Nutrition Information</CardTitle>
                            <CardDescription>Per serving</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="calories">Calories</Label>
                                    <Input
                                        id="calories"
                                        type="number"
                                        value={formData.calories}
                                        onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="protein">Protein (g)</Label>
                                    <Input
                                        id="protein"
                                        type="number"
                                        value={formData.protein}
                                        onChange={(e) => setFormData(prev => ({ ...prev, protein: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="carbs">Carbs (g)</Label>
                                    <Input
                                        id="carbs"
                                        type="number"
                                        value={formData.carbs}
                                        onChange={(e) => setFormData(prev => ({ ...prev, carbs: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="fat">Fat (g)</Label>
                                    <Input
                                        id="fat"
                                        type="number"
                                        value={formData.fat}
                                        onChange={(e) => setFormData(prev => ({ ...prev, fat: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredients */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={ingredient}
                                        onChange={(e) => updateIngredient(index, e.target.value)}
                                        placeholder={`Ingredient ${index + 1}`}
                                    />
                                    {ingredients.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeIngredient(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addIngredient}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Ingredient
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Steps */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Cooking Steps</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="w-8 h-8 bg-food-purple text-white rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                        <Textarea
                                            value={step}
                                            onChange={(e) => updateStep(index, e.target.value)}
                                            placeholder={`Step ${index + 1} instructions`}
                                            rows={2}
                                        />
                                        {steps.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeStep(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addStep}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Step
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Tags</CardTitle>
                            <CardDescription>Add tags to help categorize your recipe</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag"
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                />
                                <Button type="button" onClick={addTag}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => removeTag(tag)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-food-purple hover:bg-food-purple/90"
                            size="lg"
                        >
                            Save Recipe
                        </Button>
                    </div>
                </div>
            </div>

            {/* AI Modals */}
            {showAICalculator && (
                <AICalorieCalculator
                    isOpen={showAICalculator}
                    onClose={() => setShowAICalculator(false)}
                    onResult={handleAICalorieResult}
                    ingredients={ingredients.filter(i => i.trim())}
                />
            )}

            {showAIGenerator && (
                <AIRecipeGenerator
                    isOpen={showAIGenerator}
                    onClose={() => setShowAIGenerator(false)}
                    onResult={handleAIRecipeResult}
                />
            )}
        </div>
    );
};

export default AddRecipe;
