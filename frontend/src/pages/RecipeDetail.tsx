import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Utensils, Clock, Heart, Calendar } from 'lucide-react';
import AddToWeeklyMenuDialog from '@/components/AddToWeeklyMenuDialog';
import { useToast } from '@/hooks/use-toast';

// This would come from an API in a real app
const recipeDetails = {
    1: {
        id: 1,
        title: 'Greek Yogurt Pancakes',
        time: '20 mins',
        difficulty: 'easy' as const,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000',
        category: 'Breakfast',
        description: 'Fluffy and protein-packed pancakes made with Greek yogurt for a nutritious breakfast that will keep you energized all morning.',
        rating: 4.5,
        ingredients: [
            '1 cup all-purpose flour',
            '2 tablespoons sugar',
            '1 teaspoon baking powder',
            '1/2 teaspoon baking soda',
            'Pinch of salt',
            '3/4 cup Greek yogurt',
            '1/2 cup milk',
            '2 large eggs',
            '1 teaspoon vanilla extract',
            '2 tablespoons butter, melted'
        ],
        instructions: [
            'In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.',
            'In another bowl, mix Greek yogurt, milk, eggs, and vanilla until smooth.',
            'Pour the wet ingredients into the dry ingredients and mix until just combined.',
            'Fold in the melted butter.',
            'Heat a non-stick pan or griddle over medium heat and lightly grease.',
            'Pour 1/4 cup of batter for each pancake and cook until bubbles form on the surface, then flip and cook until golden.',
            'Serve with fresh fruits, maple syrup, or honey.'
        ],
        nutritionFacts: {
            calories: 220,
            protein: 12,
            carbs: 28,
            fat: 8
        },
        preparationTime: 10,
        cookingTime: 10
    },
    2: {
        id: 2,
        title: 'Teriyaki Salmon Bowl',
        time: '30 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000',
        category: 'Lunch',
        description: 'A delicious and nutritious bowl featuring teriyaki-glazed salmon served over fluffy rice with colorful vegetables.',
        rating: 4.7,
        ingredients: [
            '4 salmon fillets (about 6 oz each)',
            '1/3 cup teriyaki sauce',
            '2 cups cooked brown rice',
            '1 cup sliced cucumber',
            '1 avocado, sliced',
            '1 carrot, julienned',
            '1/2 cup edamame, shelled',
            '2 green onions, sliced',
            '1 tbsp sesame seeds',
            'Soy sauce and wasabi for serving (optional)'
        ],
        instructions: [
            'Marinate the salmon fillets in teriyaki sauce for 15-30 minutes.',
            'Preheat oven to 400°F (200°C).',
            'Place salmon on a lined baking sheet and bake for 12-15 minutes until cooked through.',
            'Divide cooked rice among four bowls.',
            'Arrange cucumber, avocado, carrot, and edamame around the rice.',
            'Place a salmon fillet on top of each bowl.',
            'Drizzle with remaining teriyaki sauce.',
            'Garnish with green onions and sesame seeds.'
        ],
        nutritionFacts: {
            calories: 450,
            protein: 35,
            carbs: 42,
            fat: 15
        },
        preparationTime: 15,
        cookingTime: 15
    },
    3: {
        id: 3,
        title: 'Margherita Pizza',
        time: '45 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1000',
        category: 'Dinner',
        description: 'Classic Italian pizza with a thin crust topped with tomatoes, mozzarella cheese, fresh basil, and drizzled with olive oil.',
        rating: 4.8,
        ingredients: [
            '1 pizza dough ball (about 250g)',
            '1/4 cup tomato sauce',
            '150g fresh mozzarella cheese, sliced',
            '2-3 fresh tomatoes, sliced',
            'Fresh basil leaves',
            '2 tbsp olive oil',
            'Salt and pepper to taste',
            '1 clove garlic, minced (optional)'
        ],
        instructions: [
            'Preheat oven to the highest temperature (usually around 500°F/260°C).',
            'Stretch the pizza dough on a floured surface to form a round shape.',
            'Transfer to a pizza stone or baking sheet.',
            'Spread tomato sauce evenly over the dough, leaving a small border for the crust.',
            'Arrange mozzarella slices and tomatoes on top.',
            'Bake for 8-10 minutes until crust is golden and cheese is bubbly.',
            'Remove from oven and immediately top with fresh basil leaves.',
            'Drizzle with olive oil, season with salt and pepper.'
        ],
        nutritionFacts: {
            calories: 285,
            protein: 12,
            carbs: 34,
            fat: 13
        },
        preparationTime: 20,
        cookingTime: 10
    },
    4: {
        id: 4,
        title: 'Chocolate Avocado Mousse',
        time: '15 mins',
        difficulty: 'easy' as const,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000',
        category: 'Dessert',
        description: 'A healthy twist on traditional chocolate mousse using ripe avocados for a rich, creamy texture without heavy cream.',
        rating: 4.3,
        ingredients: [
            '2 ripe avocados',
            '1/3 cup cocoa powder',
            '1/4 cup maple syrup or honey',
            '1/4 cup almond milk',
            '1 tsp vanilla extract',
            'Pinch of salt',
            'Fresh berries for topping (optional)',
            'Mint leaves for garnish (optional)'
        ],
        instructions: [
            'Cut avocados in half, remove pits, and scoop the flesh into a food processor.',
            'Add cocoa powder, maple syrup, almond milk, vanilla extract, and salt.',
            'Process until completely smooth, scraping down the sides as needed.',
            'Taste and adjust sweetness if necessary.',
            'Spoon into serving glasses or bowls.',
            'Refrigerate for at least 30 minutes to set.',
            'Top with fresh berries and mint leaves before serving.'
        ],
        nutritionFacts: {
            calories: 180,
            protein: 3,
            carbs: 18,
            fat: 12
        },
        preparationTime: 15,
        cookingTime: 0
    },
    5: {
        id: 5,
        title: 'Shakshuka',
        time: '25 mins',
        difficulty: 'medium' as const,
        image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000',
        category: 'Breakfast',
        description: 'A savory Middle Eastern breakfast dish featuring eggs poached in a flavorful tomato sauce with bell peppers, onions, and spices.',
        rating: 4.6,
        ingredients: [
            '2 tbsp olive oil',
            '1 onion, diced',
            '1 red bell pepper, diced',
            '3 cloves garlic, minced',
            '1 tsp cumin',
            '1 tsp paprika',
            '1/2 tsp chili powder',
            '1 can (28oz) crushed tomatoes',
            'Salt and pepper to taste',
            '4-6 eggs',
            'Fresh parsley or cilantro, chopped',
            'Crumbled feta cheese (optional)',
            'Warm bread for serving'
        ],
        instructions: [
            'Heat olive oil in a large skillet over medium heat.',
            'Add onion and bell pepper, sauté until softened, about 5 minutes.',
            'Add garlic and spices, cook for 1 minute until fragrant.',
            'Pour in crushed tomatoes, season with salt and pepper, and simmer for 10 minutes.',
            'Create small wells in the sauce and crack eggs into each one.',
            'Cover and cook until eggs are set to your preference, about 5-8 minutes.',
            'Garnish with fresh herbs and feta cheese if using.',
            'Serve directly from the skillet with warm bread.'
        ],
        nutritionFacts: {
            calories: 240,
            protein: 14,
            carbs: 18,
            fat: 13
        },
        preparationTime: 10,
        cookingTime: 15
    },
    6: {
        id: 6,
        title: 'Beef Wellington',
        time: '2 hours',
        difficulty: 'hard' as const,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000',
        category: 'Dinner',
        description: 'A classic British dish consisting of beef tenderloin wrapped in layers of pâté, duxelles (mushroom paste), Parma ham, and puff pastry.',
        rating: 4.9,
        ingredients: [
            '1.5 lb beef tenderloin',
            '2 tbsp olive oil',
            'Salt and pepper to taste',
            '2 tbsp Dijon mustard',
            '1 lb mushrooms, finely chopped',
            '2 shallots, finely chopped',
            '4 cloves garlic, minced',
            '4 slices Parma ham or prosciutto',
            '1 package puff pastry, thawed',
            '1 egg, beaten (for egg wash)'
        ],
        instructions: [
            'Season beef with salt and pepper. Sear in hot oil until browned on all sides. Cool completely.',
            'Make duxelles: Sauté mushrooms, shallots, and garlic until moisture evaporates. Cool completely.',
            'Brush beef with Dijon mustard.',
            'Lay plastic wrap on work surface. Arrange Parma ham slices, spread mushroom mixture on ham.',
            'Place beef in center and wrap tightly using plastic wrap. Refrigerate for 30 minutes.',
            'Roll out puff pastry, unwrap beef, and place on pastry.',
            'Wrap pastry around beef, seal edges, and trim excess. Make decorative cuts on top if desired.',
            'Brush with egg wash and refrigerate for 30 minutes.',
            'Preheat oven to 400°F (200°C).',
            'Bake for 35-40 minutes until pastry is golden and internal temperature reaches 125°F for medium-rare.',
            'Rest for 10 minutes before slicing and serving.'
        ],
        nutritionFacts: {
            calories: 650,
            protein: 42,
            carbs: 28,
            fat: 40
        },
        preparationTime: 60,
        cookingTime: 40
    }
};

const RecipeDetail = () => {
    const { id } = useParams<{ id: string; }>();
    const recipe = id ? recipeDetails[Number(id)] : null;
    const { toast } = useToast();

    const [isFavorite, setIsFavorite] = useState(() => {
        if (!recipe) return false;
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        return favorites.includes(recipe.id);
    });

    const [addToMenuDialog, setAddToMenuDialog] = useState(false);

    if (!recipe) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Recipe not found</h1>
                        <p className="mt-2 text-gray-600">The recipe you're looking for doesn't exist.</p>
                        <Button asChild className="mt-4">
                            <Link to="/">Back to Recipes</Link>
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    const difficultyColor = {
        easy: 'bg-green-100 text-green-800',
        medium: 'bg-amber-100 text-amber-800',
        hard: 'bg-red-100 text-red-800'
    };

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        let newFavorites;

        if (isFavorite) {
            newFavorites = favorites.filter((favId: number) => favId !== recipe.id);
            toast({
                title: "Removed from favorites",
                description: `${recipe.title} has been removed from your favorites.`,
            });
        } else {
            newFavorites = [...favorites, recipe.id];
            toast({
                title: "Added to favorites",
                description: `${recipe.title} has been added to your favorites.`,
            });
        }

        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Back button */}
                <div className="py-4">
                    <Button variant="ghost" asChild className="text-food-purple hover:bg-food-soft-purple">
                        <Link to="/">
                            <ArrowLeft className="mr-2" />
                            Back to recipes
                        </Link>
                    </Button>
                </div>

                {/* Recipe hero */}
                <div className="relative rounded-xl overflow-hidden">
                    <div className="h-64 md:h-80 lg:h-96">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <Badge className="bg-white/80 text-food-purple hover:bg-white self-start mb-2">
                            {recipe.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{recipe.title}</h1>
                    </div>
                </div>

                {/* Recipe info and actions */}
                <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <span className="text-gray-700">{recipe.time}</span>
                            </div>
                            <Badge variant="outline" className={`text-xs ${difficultyColor[recipe.difficulty]}`}>
                                {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                            </Badge>
                            <div className="text-yellow-500">
                                {recipe.rating} ★★★★☆
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={toggleFavorite}
                                className={`${isFavorite ? 'text-red-500 border-red-500' : ''}`}
                            >
                                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setAddToMenuDialog(true)}
                                className="text-food-purple border-food-purple hover:bg-food-soft-purple"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Add to Weekly Menu
                            </Button>
                            <Button className="bg-food-purple hover:bg-food-purple/90">
                                <Utensils className="mr-2" />
                                Start Cooking
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-700 text-lg">{recipe.description}</p>
                    </div>

                    {/* Nutrition info */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Facts</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.entries(recipe.nutritionFacts).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-lg font-medium text-gray-900">{value.toString()}</p>
                                    <p className="text-xs text-gray-500 uppercase">{key}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
                        <ol className="list-decimal list-inside space-y-4 text-gray-700">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="pl-2">
                                    <span className="font-medium text-food-purple mr-2">Step {index + 1}:</span> {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Preparation & Cooking Time */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-food-soft-purple p-4 rounded-lg">
                            <h3 className="font-medium text-food-purple">Preparation Time</h3>
                            <p className="text-xl">{recipe.preparationTime} minutes</p>
                        </div>
                        <div className="bg-food-soft-peach p-4 rounded-lg">
                            <h3 className="font-medium text-food-orange">Cooking Time</h3>
                            <p className="text-xl">{recipe.cookingTime} minutes</p>
                        </div>
                    </div>
                </div>
            </main>

            <AddToWeeklyMenuDialog
                isOpen={addToMenuDialog}
                onClose={() => setAddToMenuDialog(false)}
                recipeTitle={recipe.title}
                recipeId={recipe.id}
            />
        </div>
    );
};

export default RecipeDetail;
