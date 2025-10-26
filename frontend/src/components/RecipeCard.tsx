
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

interface RecipeCardProps {
    id: number;
    title: string;
    time: string;
    difficulty: 'fácil' | 'medio' | 'difícil';
    image: string;
    category: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    tags?: string[];
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

    const difficultyColor = {
        fácil: 'bg-green-100 text-green-800',
        medio: 'bg-amber-100 text-amber-800',
        difícil: 'bg-red-100 text-red-800'
    };

    const tagColors = {
        'bajo en carbohidratos': 'bg-blue-100 text-blue-800',
        'alto en carbohidratos': 'bg-orange-100 text-orange-800',
        'alto en proteína': 'bg-purple-100 text-purple-800',
        'vegetariano': 'bg-green-100 text-green-800',
        'alto en grasas': 'bg-red-100 text-red-800',
        'bajo en grasas': 'bg-cyan-100 text-cyan-800',
        'sin gluten': 'bg-yellow-100 text-yellow-800',
        'sin lácteos': 'bg-pink-100 text-pink-800',
        'vegano': 'bg-emerald-100 text-emerald-800'
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

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to={`/recipe/${id}`} className="block h-full">
                    <Card className="recipe-card h-full flex flex-col transition-transform duration-300 hover:shadow-md hover:-translate-y-1 relative">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/80 text-food-purple hover:bg-white">
                                {category}
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
                                <Badge variant="outline" className={`text-xs ${difficultyColor[difficulty]}`}>
                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                </Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            {(calories || protein || carbs || fat) && (
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                                    {calories && <div><span className="font-medium">Cal:</span> {calories}</div>}
                                    {protein && <div><span className="font-medium">Proteína:</span> {protein}g</div>}
                                    {carbs && <div><span className="font-medium">Carbos:</span> {carbs}g</div>}
                                    {fat && <div><span className="font-medium">Grasas:</span> {fat}g</div>}
                                </div>
                            )}

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {tags.slice(0, 3).map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className={`text-xs ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {tag}
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
                                Una deliciosa receta perfecta para cualquier ocasión. ¡Prueba este platillo delicioso hoy!
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
