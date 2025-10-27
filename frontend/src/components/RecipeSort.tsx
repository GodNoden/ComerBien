import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';
import { MealCategory, Tag } from '@/types';

interface RecipeSortProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

const RecipeSort = ({ sortBy, onSortChange }: RecipeSortProps) => {
    return (
        <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas las Recetas</SelectItem>
                    
                    {/* Categorías de comida */}
                    <SelectItem value="desayuno">Solo Desayuno</SelectItem>
                    <SelectItem value="comida">Solo Comida</SelectItem>
                    <SelectItem value="cena">Solo Cena</SelectItem>
                    <SelectItem value="snack">Solo Snack</SelectItem>
                    
                    {/* Tags dietéticos */}
                    <SelectItem value="bajo-carbos">Bajo en Carbos</SelectItem>
                    <SelectItem value="alto-proteina">Alto en Proteína</SelectItem>
                    <SelectItem value="vegetariano">Vegetariano</SelectItem>
                    <SelectItem value="vegano">Vegano</SelectItem>
                    <SelectItem value="gluten-free">Sin Gluten</SelectItem>
                    <SelectItem value="dairy-free">Sin Lácteos</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="bajo-calorias">Bajas Calorías</SelectItem>
                    <SelectItem value="comida-rapida">Comida Rápida</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default RecipeSort;