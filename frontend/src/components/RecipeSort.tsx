
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

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
                    <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas las Recetas</SelectItem>
                    <SelectItem value="desayuno">Solo Desayuno</SelectItem>
                    <SelectItem value="comida">Solo Comida</SelectItem>
                    <SelectItem value="cena">Solo Cena</SelectItem>
                    <SelectItem value="dessert">Solo Snack</SelectItem>
                    <SelectItem value="low-carb">Bajos en Carbos</SelectItem>
                    <SelectItem value="high-carb">Altos en Carbos</SelectItem>
                    <SelectItem value="high-protein">Alto en Proteína</SelectItem>
                    <SelectItem value="vegetarian">Vegetariano</SelectItem>
                    <SelectItem value="high-fat">Alto en Grasa</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default RecipeSort;
