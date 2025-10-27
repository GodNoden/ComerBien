import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Heart, Calendar, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Difficulty, MealCategory, Tag } from '@/types';

interface RecipeCardProps {
    id: number;
    title: string;
    time: string;
    difficulty: Difficulty;
    image?: string;
    category: MealCategory;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    tags: Tag[];
    ingredients?: string[];
    instructions?: string;
    onAddToWeeklyMenu?: (recipeId: number, recipeTitle: string) => void;
}

const RecipeCard = ({
    id,
    title,
    time,
    difficulty,
    image,
    category,
    calories,
    protein,
    carbs,
    fat,
    tags = [],
    onAddToWeeklyMenu
}: RecipeCardProps) => {
    const { toast } = useToast();
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        return favorites.includes(id);
    });

    // Mapeo de dificultad a español
    const difficultyMap = {
        [Difficulty.FACIL]: { text: 'fácil', color: 'bg-green-100 text-green-800' },
        [Difficulty.MEDIO]: { text: 'medio', color: 'bg-amber-100 text-amber-800' },
        [Difficulty.DIFICIL]: { text: 'difícil', color: 'bg-red-100 text-red-800' }
    };

    // Agrega un valor por defecto para dificultades desconocidas
    const getDifficultyInfo = (diff: Difficulty) => {
        return difficultyMap[diff] || { text: 'medio', color: 'bg-amber-100 text-amber-800' };
    };


    // Mapeo de categorías a español
    const categoryMap = {
        [MealCategory.DESAYUNO]: 'Desayuno',
        [MealCategory.COMIDA]: 'Comida',
        [MealCategory.CENA]: 'Cena',
        [MealCategory.SNACK]: 'Snack'
    };

    // Mapeo de tags a español
    const tagMap: { [key in Tag]: { text: string; color: string; } } = {
        [Tag.VEGETARIANA]: { text: 'Vegetariano', color: 'bg-green-100 text-green-800' },
        [Tag.VEGANA]: { text: 'Vegano', color: 'bg-emerald-100 text-emerald-800' },
        [Tag.ALTA_PROTEINA]: { text: 'Alto en Proteína', color: 'bg-purple-100 text-purple-800' },
        [Tag.BAJO_EN_CARBOS]: { text: 'Bajo en Carbos', color: 'bg-blue-100 text-blue-800' },
        [Tag.GLUTEN_FREE]: { text: 'Sin Gluten', color: 'bg-yellow-100 text-yellow-800' },
        [Tag.SIN_LACTOSA]: { text: 'Sin Lácteos', color: 'bg-pink-100 text-pink-800' },
        [Tag.RAPIDA]: { text: 'Comida Rápida', color: 'bg-orange-100 text-orange-800' },
        [Tag.KETO]: { text: 'Keto', color: 'bg-indigo-100 text-indigo-800' },
        [Tag.ALTA_FIBRA]: { text: 'Alta Fibra', color: 'bg-teal-100 text-teal-800' },
        [Tag.BAJO_EN_CALORIAS]: { text: 'Bajas Calorías', color: 'bg-cyan-100 text-cyan-800' }
    };

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter((favId: number) => favId !== id);
            toast({
                title: "Eliminado de favoritos",
                description: `${title} se ha eliminado de tus favoritos.`,
            });
        } else {
            newFavorites = [...favorites, id];
            toast({
                title: "Agregado a favoritos",
                description: `${title} se ha agregado a tus favoritos.`,
            });
        }

        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const addToWeeklyMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onAddToWeeklyMenu) {
            onAddToWeeklyMenu(id, title);
        }
    };

    // Imagen por defecto si no hay imagen
    const defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to={`/recipe/${id}`} className="block h-full">
                    <Card className="recipe-card h-full flex flex-col transition-transform duration-300 hover:shadow-md hover:-translate-y-1 relative">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={image || defaultImage}
                                alt={title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/80 text-food-purple hover:bg-white">
                                {categoryMap[category]}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`absolute top-3 right-3 h-8 w-8 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 bg-white/80 hover:bg-white`}
                                onClick={toggleFavorite}
                            >
                                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                            </Button>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold line-clamp-1">{title}</CardTitle>
                            <CardDescription className="flex justify-between items-center">
                                <span className="text-sm">{time}</span>
                                <Badge variant="outline" className={`text-xs ${getDifficultyInfo(difficulty).color}`}>
                                    {getDifficultyInfo(difficulty).text}
                                </Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                                <div><span className="font-medium">Cal:</span> {calories}</div>
                                <div><span className="font-medium">Proteína:</span> {protein}g</div>
                                <div><span className="font-medium">Carbos:</span> {carbs}g</div>
                                <div><span className="font-medium">Grasas:</span> {fat}g</div>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {tags.slice(0, 3).map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className={`text-xs ${tagMap[tag]?.color || 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {tagMap[tag]?.text || tag}
                                        </Badge>
                                    ))}
                                    {tags.length > 3 && (
                                        <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                            +{tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            )}

                            <p className="text-sm text-gray-500 line-clamp-2">
                                Una deliciosa receta perfecta para cualquier ocasión.
                            </p>
                        </CardContent>
                        <CardFooter className="pt-2">
                            <div className="text-xs text-gray-400 flex items-center justify-between w-full">
                                <span>4.5 ★★★★☆</span>
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem onClick={addToWeeklyMenu}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agregar al Menú Semanal
                </ContextMenuItem>
                <ContextMenuItem onClick={toggleFavorite}>
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'text-red-500' : ''}`} />
                    {isFavorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    Acciones Rápidas
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default RecipeCard;