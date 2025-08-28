
export interface Recipe2 {
    id: number;
    title: string;
    image: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
}

export interface Recipe {
    id: number;
    title: string;
    time: string;
    difficulty: 'easy' | 'medium' | 'hard';
    image: string;
    category: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    tags: string[];
    ingredients: string[];
}

export interface DayMeals {
    breakfast: Recipe[];
    lunch: Recipe[];
    dinner: Recipe[];
    snack: Recipe[];
}

export interface MealPlan {
    Monday: DayMeals;
    Tuesday: DayMeals;
    Wednesday: DayMeals;
    Thursday: DayMeals;
    Friday: DayMeals;
    Saturday: DayMeals;
    Sunday: DayMeals;
}

export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // Note: In production, password should not be included in frontend types
}
