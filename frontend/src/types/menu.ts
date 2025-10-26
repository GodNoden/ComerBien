
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
    ingredients?: string[];
}

export interface DayMeals {
    desayuno: Recipe[];
    comida: Recipe[];
    cena: Recipe[];
    snack: Recipe[];
}

export interface MealPlan {
    Lunes: DayMeals;
    Martes: DayMeals;
    Miércoles: DayMeals;
    Jueves: DayMeals;
    Viernes: DayMeals;
    Sábado: DayMeals;
    Domingo: DayMeals;
}
