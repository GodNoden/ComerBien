import { useAuth } from "@/contexts/AuthContext";
import { recipeService } from "@/services/recipeService";
import { RecipeResponse } from "@/types";
import { useEffect, useState } from "react";

export const useRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token, isLoggedIn } = useAuth();

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔍 Fetching recipes...', { isLoggedIn, hasToken: !!token });

            let recipesData: RecipeResponse[];

            if (isLoggedIn && token) {
                console.log('📡 Fetching authenticated recipes...');
                recipesData = await recipeService.getRecipes(token);
            } else {
                console.log('📡 Fetching public recipes...');
                recipesData = await recipeService.getPublicRecipes();
            }

            console.log('✅ Recipes loaded:', recipesData);
            setRecipes(recipesData);
        } catch (err: any) {
            console.error('❌ Error fetching recipes:', err);
            setError(err.message || 'Error al cargar las recetas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [isLoggedIn, token]);

    return {
        recipes,
        loading,
        error,
        refetch: fetchRecipes
    };
};