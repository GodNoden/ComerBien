
export interface Recipe {
    id: number;
    title: string;
    image: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
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
