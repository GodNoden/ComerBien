// Enums para coincidir con el backend
export enum Difficulty {
    FACIL = 'FÁCIL',
    MEDIO = 'MEDIO',
    DIFICIL = 'DIFÍCIL'
}

export enum MealCategory {
    DESAYUNO = 'DESAYUNO',
    COMIDA = 'COMIDA',
    CENA = 'CENA',
    SNACK = 'SNACK'
}

export enum Tag {
    VEGETARIANA = 'VEGETARIANA',
    VEGANA = 'VEGAN',
    ALTA_PROTEINA = 'ALTA_PROTEINA',
    BAJO_EN_CARBOS = 'BAJO_EN_CARBOS',
    GLUTEN_FREE = 'GLUTEN_FREE',
    SIN_LACTOSA = 'SIN_LACTOSA',
    RAPIDA = 'RÁPIDA',
    KETO = 'KETO',
    ALTA_FIBRA = 'ALTA_FIBRA',
    BAJO_EN_CALORIAS = 'BAJO_EN_CALORIAS'
}

export enum DayOfWeek {
    LUNES = 'LUNES',
    MARTES = 'MARTES',
    MIERCOLES = 'MIÉRCOLES',
    JUEVES = 'JUEVES',
    VIERNES = 'VIERNES',
    SABADO = 'SÁBADO',
    DOMINGO = 'DOMINGO'
}

// Interfaces principales
export interface User {
    id: number;
    username: string;
    email: string;
    dietaryPreferences?: Tag[];
    excludedIngredients?: string[];
}

export interface Recipe {
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
    ingredients: string[];
    instructions?: string;
    isPublic?: boolean;
    createdBy?: User;
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

// Request DTOs
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    dietaryPreferences?: Tag[];
    excludedIngredients?: string[];
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RecipeRequest {
    title: string;
    time: string;
    difficulty: Difficulty;
    image?: string;
    category: MealCategory;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    tags?: Tag[];
    ingredients?: string[];
    instructions?: string;
    isPublic?: boolean;
}

// Response DTOs
export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
}

export interface RecipeResponse {
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
    ingredients: string[];
    instructions?: string;
    isPublic?: boolean;
    createdBy?: User;
}

export interface FeaturedRecipesProps {
  recipes?: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}

// Para manejar estados de carga
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}