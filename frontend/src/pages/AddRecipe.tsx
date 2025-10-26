
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import Header from '@/components/Header';

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
                        Volver al Inicio
                    </Button>
                    <h1 className="text-3xl font-bold text-food-purple">Agregar Nueva Receta</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Básica</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Título de la Receta</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Ingresa el título de la receta"
                                />
                            </div>

                            <div>
                                <Label htmlFor="image">Imagen de la Receta</Label>
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
                                        Subir Imagen
                                    </Button>
                                    {formData.image && (
                                        <img src={formData.image} alt="Vista previa" className="h-16 w-16 object-cover rounded" />
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="category">Categoría</Label>
                                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desayuno">Desayuno</SelectItem>
                                        <SelectItem value="comida">Comida</SelectItem>
                                        <SelectItem value="cena">Cena</SelectItem>
                                        <SelectItem value="snack">Snack</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="time">Tiempo de Cocción</Label>
                                    <Input
                                        id="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                        placeholder="ej., 30 minutos"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="complexity">Complejidad</Label>
                                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona complejidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fácil">Fácil</SelectItem>
                                            <SelectItem value="medio">Medio</SelectItem>
                                            <SelectItem value="difícil">Difícil</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Breve descripción de la receta"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Información Nutricional</CardTitle>
                            <CardDescription>Por porción</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="calories">Calorías</Label>
                                    <Input
                                        id="calories"
                                        type="number"
                                        value={formData.calories}
                                        onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="protein">Proteína (g)</Label>
                                    <Input
                                        id="protein"
                                        type="number"
                                        value={formData.protein}
                                        onChange={(e) => setFormData(prev => ({ ...prev, protein: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="carbs">Carbohidratos (g)</Label>
                                    <Input
                                        id="carbs"
                                        type="number"
                                        value={formData.carbs}
                                        onChange={(e) => setFormData(prev => ({ ...prev, carbs: e.target.value }))}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="fat">Grasa (g)</Label>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Ingredientes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={ingredient}
                                        onChange={(e) => updateIngredient(index, e.target.value)}
                                        placeholder={`Ingrediente ${index + 1}`}
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
                                Agregar Ingrediente
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pasos de Preparación</CardTitle>
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
                                            placeholder={`Instrucciones del paso ${index + 1}`}
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
                                Agregar Paso
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Etiquetas</CardTitle>
                            <CardDescription>Agrega etiquetas para ayudar a categorizar tu receta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Agregar una etiqueta"
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

                    <div className="md:col-span-2">
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-food-purple hover:bg-food-purple/90"
                            size="lg"
                        >
                            Guardar Receta
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
