
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
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Recipes</SelectItem>
                    <SelectItem value="breakfast">Breakfast Only</SelectItem>
                    <SelectItem value="lunch">Lunch Only</SelectItem>
                    <SelectItem value="dinner">Dinner Only</SelectItem>
                    <SelectItem value="dessert">Dessert Only</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="high-carb">High Carb</SelectItem>
                    <SelectItem value="high-protein">High Protein</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="high-fat">High Fat</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default RecipeSort;
