import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Utensils, Clock, Heart, Calendar, Lightbulb, ExternalLink } from 'lucide-react';
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
  },
  7: {
    id: 7,
    title: 'Quinoa Buddha Bowl',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000',
    category: 'Lunch',
    description: 'A colorful and nutritious bowl packed with quinoa, fresh vegetables, and a tahini dressing for a satisfying and healthy meal.',
    rating: 4.4,
    ingredients: [
      '1 cup cooked quinoa',
      '1/2 cup chickpeas, roasted',
      '1 cup mixed greens',
      '1/2 avocado, sliced',
      '1/2 cucumber, diced',
      '1/2 red bell pepper, sliced',
      '1/4 red onion, thinly sliced',
      '2 tbsp pumpkin seeds',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook quinoa according to package directions and let cool.',
      'Roast chickpeas in oven at 400°F for 15-20 minutes until crispy.',
      'Arrange mixed greens in a bowl as the base.',
      'Top with quinoa, roasted chickpeas, avocado, cucumber, bell pepper, and red onion.',
      'Whisk together tahini, lemon juice, olive oil, salt, and pepper for dressing.',
      'Drizzle dressing over the bowl and sprinkle with pumpkin seeds.',
      'Serve immediately and enjoy!'
    ],
    nutritionFacts: {
      calories: 380,
      protein: 16,
      carbs: 45,
      fat: 14
    },
    preparationTime: 15,
    cookingTime: 10
  },
  8: {
    id: 8,
    title: 'Grilled Chicken Caesar Salad',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1000',
    category: 'Lunch',
    description: 'Classic Caesar salad elevated with perfectly grilled chicken breast, homemade croutons, and a creamy dressing.',
    rating: 4.6,
    ingredients: [
      '2 chicken breasts, boneless and skinless',
      '6 cups romaine lettuce, chopped',
      '1/4 cup parmesan cheese, grated',
      '1/2 cup croutons',
      '2 tbsp mayonnaise',
      '1 tbsp lemon juice',
      '1 tsp Dijon mustard',
      '1 clove garlic, minced',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      '2 anchovy fillets (optional)'
    ],
    instructions: [
      'Season chicken breasts with salt, pepper, and olive oil.',
      'Grill chicken over medium-high heat for 6-7 minutes per side until cooked through.',
      'Let chicken rest for 5 minutes, then slice.',
      'Make dressing by whisking mayonnaise, lemon juice, mustard, garlic, and anchovies.',
      'Toss romaine lettuce with dressing.',
      'Top salad with sliced chicken, parmesan cheese, and croutons.',
      'Serve immediately.'
    ],
    nutritionFacts: {
      calories: 320,
      protein: 28,
      carbs: 8,
      fat: 18
    },
    preparationTime: 10,
    cookingTime: 10
  },
  9: {
    id: 9,
    title: 'Overnight Chia Pudding',
    time: '5 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000',
    category: 'Breakfast',
    description: 'A make-ahead breakfast loaded with omega-3s and fiber. Perfect for busy mornings when topped with fresh fruits.',
    rating: 4.3,
    ingredients: [
      '1/4 cup chia seeds',
      '1 cup almond milk',
      '2 tbsp maple syrup',
      '1/2 tsp vanilla extract',
      'Pinch of salt',
      '1/2 cup mixed berries',
      '2 tbsp sliced almonds',
      '1 tbsp coconut flakes',
      'Extra berries for topping'
    ],
    instructions: [
      'In a bowl, whisk together chia seeds, almond milk, maple syrup, vanilla, and salt.',
      'Let sit for 5 minutes, then whisk again to prevent clumping.',
      'Cover and refrigerate for at least 2 hours or overnight.',
      'Before serving, stir the pudding well.',
      'Layer pudding with berries in glasses or bowls.',
      'Top with sliced almonds, coconut flakes, and extra berries.',
      'Enjoy cold!'
    ],
    nutritionFacts: {
      calories: 250,
      protein: 8,
      carbs: 22,
      fat: 15
    },
    preparationTime: 5,
    cookingTime: 0
  },
  10: {
    id: 10,
    title: 'Spicy Thai Basil Stir Fry',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?q=80&w=1000',
    category: 'Dinner',
    description: 'A quick and flavorful stir fry with ground meat, fresh basil, and Thai chilies served over jasmine rice.',
    rating: 4.5,
    ingredients: [
      '1 lb ground chicken or pork',
      '3 tbsp vegetable oil',
      '4 cloves garlic, minced',
      '2-3 Thai chilies, sliced',
      '1 onion, sliced',
      '2 tbsp fish sauce',
      '1 tbsp soy sauce',
      '1 tsp sugar',
      '1 cup fresh Thai basil leaves',
      '2 cups cooked jasmine rice',
      '2 eggs (optional, for serving)'
    ],
    instructions: [
      'Heat oil in a large wok or skillet over high heat.',
      'Add garlic and chilies, stir fry for 30 seconds until fragrant.',
      'Add ground meat and cook, breaking it up, until browned and cooked through.',
      'Add onion and stir fry for 2-3 minutes.',
      'Add fish sauce, soy sauce, and sugar. Stir well.',
      'Remove from heat and stir in fresh basil leaves.',
      'Serve over jasmine rice with fried eggs if desired.'
    ],
    nutritionFacts: {
      calories: 420,
      protein: 25,
      carbs: 35,
      fat: 20
    },
    preparationTime: 10,
    cookingTime: 5
  },
  11: {
    id: 11,
    title: 'Protein Energy Balls',
    time: '10 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000',
    category: 'Snack',
    description: 'No-bake energy balls packed with protein powder, nuts, and dates for a perfect post-workout snack.',
    rating: 4.2,
    ingredients: [
      '1 cup pitted dates',
      '1/2 cup raw almonds',
      '2 scoops vanilla protein powder',
      '2 tbsp almond butter',
      '2 tbsp chia seeds',
      '1 tsp vanilla extract',
      '1/4 cup mini dark chocolate chips',
      '2 tbsp coconut flakes (optional)',
      'Pinch of salt'
    ],
    instructions: [
      'Soak dates in warm water for 10 minutes to soften.',
      'In a food processor, pulse almonds until roughly chopped.',
      'Add drained dates and process until a paste forms.',
      'Add protein powder, almond butter, chia seeds, vanilla, and salt. Process until combined.',
      'Stir in chocolate chips by hand.',
      'Roll mixture into 12-15 balls using your hands.',
      'Roll in coconut flakes if desired.',
      'Refrigerate for 30 minutes before serving.'
    ],
    nutritionFacts: {
      calories: 160,
      protein: 8,
      carbs: 12,
      fat: 9
    },
    preparationTime: 10,
    cookingTime: 0
  },
  12: {
    id: 12,
    title: 'Mediterranean Stuffed Peppers',
    time: '40 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1594737791203-c519cd2faa16?q=80&w=1000',
    category: 'Dinner',
    description: 'Bell peppers stuffed with a Mediterranean-inspired mixture of quinoa, vegetables, feta cheese, and herbs.',
    rating: 4.7,
    ingredients: [
      '4 large bell peppers, tops cut and seeds removed',
      '1 cup cooked quinoa',
      '1/2 cup diced tomatoes',
      '1/4 cup red onion, diced',
      '1/4 cup kalamata olives, chopped',
      '1/3 cup feta cheese, crumbled',
      '2 tbsp pine nuts',
      '2 tbsp fresh parsley, chopped',
      '1 tbsp olive oil',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a bowl, mix quinoa, tomatoes, onion, olives, feta, pine nuts, parsley, and oregano.',
      'Season with salt, pepper, and olive oil.',
      'Stuff each pepper with the quinoa mixture.',
      'Place peppers in a baking dish with a little water at the bottom.',
      'Cover with foil and bake for 25-30 minutes.',
      'Remove foil and bake 10 more minutes until peppers are tender.',
      'Serve hot with extra feta if desired.'
    ],
    nutritionFacts: {
      calories: 290,
      protein: 18,
      carbs: 32,
      fat: 12
    },
    preparationTime: 15,
    cookingTime: 25
  },
  13: {
    id: 13,
    title: 'Avocado Toast with Poached Egg',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1000',
    category: 'Breakfast',
    description: 'Perfectly ripe avocado on toasted sourdough bread topped with a runny poached egg and fresh herbs.',
    rating: 4.4,
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 fresh eggs',
      '1 tbsp white vinegar',
      '1 tbsp olive oil',
      '1/4 tsp red pepper flakes',
      'Salt and black pepper to taste',
      'Fresh chives, chopped',
      'Everything bagel seasoning (optional)'
    ],
    instructions: [
      'Toast bread slices until golden brown.',
      'Bring a pot of water to simmer, add vinegar.',
      'Crack eggs into small bowls.',
      'Create a whirlpool in water and gently drop in eggs.',
      'Poach for 3-4 minutes for runny yolks.',
      'Mash avocado with salt, pepper, and olive oil.',
      'Spread avocado mixture on toast.',
      'Top each toast with a poached egg.',
      'Sprinkle with red pepper flakes, chives, and everything seasoning.'
    ],
    nutritionFacts: {
      calories: 310,
      protein: 16,
      carbs: 24,
      fat: 18
    },
    preparationTime: 10,
    cookingTime: 5
  },
  14: {
    id: 14,
    title: 'Lemon Herb Baked Cod',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?q=80&w=1000',
    category: 'Dinner',
    description: 'Flaky white cod baked with fresh herbs, lemon, and garlic for a light and healthy dinner option.',
    rating: 4.5,
    ingredients: [
      '4 cod fillets (6 oz each)',
      '2 lemons (1 juiced, 1 sliced)',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '2 tbsp fresh parsley, chopped',
      '1 tbsp fresh dill, chopped',
      '1 tsp dried thyme',
      'Salt and pepper to taste',
      '1 lb asparagus, trimmed',
      '1 tbsp butter'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pat cod fillets dry and season with salt and pepper.',
      'In a bowl, mix lemon juice, garlic, olive oil, parsley, dill, and thyme.',
      'Place cod in a baking dish and pour herb mixture over fish.',
      'Top with lemon slices.',
      'Toss asparagus with butter, salt, and pepper. Add to baking dish.',
      'Bake for 12-15 minutes until fish flakes easily.',
      'Serve immediately with lemon wedges.'
    ],
    nutritionFacts: {
      calories: 220,
      protein: 32,
      carbs: 3,
      fat: 8
    },
    preparationTime: 10,
    cookingTime: 15
  },
  15: {
    id: 15,
    title: 'Sweet Potato Black Bean Tacos',
    time: '30 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000',
    category: 'Lunch',
    description: 'Vegetarian tacos filled with roasted sweet potatoes, seasoned black beans, and fresh toppings.',
    rating: 4.6,
    ingredients: [
      '2 large sweet potatoes, diced',
      '1 can black beans, drained and rinsed',
      '8 corn tortillas',
      '1 red onion, diced',
      '2 tsp cumin',
      '1 tsp paprika',
      '2 tbsp olive oil',
      '1/2 cup cilantro, chopped',
      '1 lime, cut into wedges',
      '1/4 cup red cabbage, shredded',
      '1 avocado, sliced',
      'Hot sauce to taste'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Toss diced sweet potatoes with olive oil, cumin, paprika, salt, and pepper.',
      'Roast for 20-25 minutes until tender and slightly caramelized.',
      'Warm black beans in a pan with half the diced onion.',
      'Warm tortillas in a dry skillet or microwave.',
      'Fill tortillas with roasted sweet potatoes and black beans.',
      'Top with remaining onion, cilantro, cabbage, and avocado.',
      'Serve with lime wedges and hot sauce.'
    ],
    nutritionFacts: {
      calories: 350,
      protein: 14,
      carbs: 52,
      fat: 10
    },
    preparationTime: 10,
    cookingTime: 20
  },
  16: {
    id: 16,
    title: 'Banana Walnut Smoothie Bowl',
    time: '10 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1000',
    category: 'Breakfast',
    description: 'A thick and creamy smoothie bowl made with frozen bananas, topped with crunchy walnuts and fresh fruits.',
    rating: 4.3,
    ingredients: [
      '2 frozen bananas',
      '1/2 cup almond milk',
      '2 tbsp almond butter',
      '1 tbsp honey',
      '1/4 cup walnuts, chopped',
      '1/2 cup fresh berries',
      '2 tbsp granola',
      '1 tbsp chia seeds',
      '1 tbsp coconut flakes',
      'Extra banana slices for topping'
    ],
    instructions: [
      'In a blender, combine frozen bananas, almond milk, almond butter, and honey.',
      'Blend until thick and creamy, adding more milk if needed.',
      'Pour smoothie into a bowl.',
      'Arrange toppings in sections: walnuts, berries, granola, and banana slices.',
      'Sprinkle with chia seeds and coconut flakes.',
      'Serve immediately with a spoon.'
    ],
    nutritionFacts: {
      calories: 380,
      protein: 12,
      carbs: 48,
      fat: 16
    },
    preparationTime: 10,
    cookingTime: 0
  },
  17: {
    id: 17,
    title: 'Garlic Herb Roasted Chicken',
    time: '1 hour',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1000',
    category: 'Dinner',
    description: 'Juicy roasted chicken with crispy skin, seasoned with garlic, herbs, and served with roasted vegetables.',
    rating: 4.8,
    ingredients: [
      '1 whole chicken (3-4 lbs)',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '2 tbsp butter, softened',
      '2 tsp dried rosemary',
      '2 tsp dried thyme',
      '1 lemon, halved',
      'Salt and pepper to taste',
      '2 cups baby potatoes, halved',
      '2 carrots, cut into chunks',
      '1 onion, quartered'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Pat chicken dry and season inside and out with salt and pepper.',
      'Mix garlic, butter, rosemary, and thyme. Rub under and over skin.',
      'Stuff cavity with lemon halves.',
      'Place chicken in roasting pan with vegetables around it.',
      'Drizzle vegetables with olive oil and season.',
      'Roast for 50-60 minutes until internal temp reaches 165°F.',
      'Rest for 10 minutes before carving.'
    ],
    nutritionFacts: {
      calories: 480,
      protein: 38,
      carbs: 8,
      fat: 32
    },
    preparationTime: 15,
    cookingTime: 45
  },
  18: {
    id: 18,
    title: 'Coconut Curry Lentil Soup',
    time: '35 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000',
    category: 'Lunch',
    description: 'A warming and nutritious soup with red lentils, coconut milk, and aromatic spices. Perfect for cold days.',
    rating: 4.5,
    ingredients: [
      '1 cup red lentils',
      '1 can coconut milk',
      '2 cups vegetable broth',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '2 tsp curry powder',
      '1 tsp turmeric',
      '1/2 tsp cumin',
      '2 tbsp olive oil',
      '1 cup spinach leaves',
      'Salt and pepper to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Sauté onion until softened, about 5 minutes.',
      'Add garlic, ginger, curry powder, turmeric, and cumin. Cook 1 minute.',
      'Add lentils, coconut milk, and broth. Bring to a boil.',
      'Reduce heat and simmer for 20-25 minutes until lentils are tender.',
      'Stir in spinach and cook until wilted.',
      'Season with salt and pepper.',
      'Serve hot, garnished with fresh cilantro.'
    ],
    nutritionFacts: {
      calories: 280,
      protein: 18,
      carbs: 38,
      fat: 8
    },
    preparationTime: 10,
    cookingTime: 25
  },
  19: {
    id: 19,
    title: 'Dark Chocolate Protein Brownies',
    time: '35 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000',
    category: 'Dessert',
    description: 'Fudgy brownies made with protein powder and dark chocolate for a healthier dessert option.',
    rating: 4.4,
    ingredients: [
      '1/2 cup dark chocolate, melted',
      '2 scoops chocolate protein powder',
      '1/4 cup almond flour',
      '2 eggs',
      '1/4 cup Greek yogurt',
      '2 tbsp honey',
      '2 tbsp coconut oil, melted',
      '1 tsp vanilla extract',
      '1/4 tsp baking soda',
      'Pinch of salt',
      '1/4 cup dark chocolate chips'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C). Line an 8x8 baking pan.',
      'In a bowl, whisk together protein powder, almond flour, baking soda, and salt.',
      'In another bowl, mix eggs, Greek yogurt, honey, coconut oil, and vanilla.',
      'Stir in melted chocolate.',
      'Fold wet ingredients into dry ingredients until just combined.',
      'Fold in chocolate chips.',
      'Pour into prepared pan and smooth top.',
      'Bake for 18-20 minutes until set but still fudgy.',
      'Cool completely before cutting.'
    ],
    nutritionFacts: {
      calories: 200,
      protein: 12,
      carbs: 16,
      fat: 10
    },
    preparationTime: 15,
    cookingTime: 20
  },
  20: {
    id: 20,
    title: 'Asian Lettuce Wraps',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1604467707321-70d5ac45adda?q=80&w=1000',
    category: 'Lunch',
    description: 'Light and fresh lettuce cups filled with seasoned ground turkey and Asian-inspired flavors.',
    rating: 4.5,
    ingredients: [
      '1 lb ground turkey',
      '1 head butter lettuce, leaves separated',
      '2 tbsp sesame oil',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '3 green onions, sliced',
      '2 tbsp soy sauce',
      '1 tbsp rice vinegar',
      '1 tsp sriracha',
      '1/2 cup water chestnuts, diced',
      '2 tbsp peanuts, chopped',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat sesame oil in a large skillet over medium-high heat.',
      'Add ground turkey and cook, breaking it up, until browned.',
      'Add garlic, ginger, and white parts of green onions. Cook 1 minute.',
      'Stir in soy sauce, rice vinegar, and sriracha.',
      'Add water chestnuts and cook 2 more minutes.',
      'Remove from heat and stir in green parts of onions.',
      'Spoon mixture into lettuce cups.',
      'Top with peanuts and cilantro.',
      'Serve immediately.'
    ],
    nutritionFacts: {
      calories: 240,
      protein: 22,
      carbs: 12,
      fat: 12
    },
    preparationTime: 10,
    cookingTime: 10
  },
  21: {
    id: 21,
    title: 'Almond Flour Pancakes',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1000',
    category: 'Breakfast',
    description: 'Fluffy, low-carb pancakes made with almond flour that are naturally gluten-free and keto-friendly.',
    rating: 4.3,
    ingredients: [
      '1 cup almond flour',
      '3 large eggs',
      '1/4 cup unsweetened almond milk',
      '2 tbsp cream cheese, softened',
      '1 tbsp erythritol or sweetener',
      '1/2 tsp baking powder',
      '1/2 tsp vanilla extract',
      'Pinch of salt',
      '2 tbsp butter for cooking',
      'Sugar-free syrup for serving'
    ],
    instructions: [
      'In a bowl, whisk together almond flour, baking powder, and salt.',
      'In another bowl, beat eggs, then add almond milk, cream cheese, sweetener, and vanilla.',
      'Combine wet and dry ingredients until smooth batter forms.',
      'Let batter rest for 5 minutes to thicken.',
      'Heat butter in a non-stick pan over medium-low heat.',
      'Pour 1/4 cup batter per pancake and cook 2-3 minutes per side.',
      'Serve hot with sugar-free syrup.'
    ],
    nutritionFacts: {
      calories: 290,
      protein: 14,
      carbs: 8,
      fat: 22
    },
    preparationTime: 10,
    cookingTime: 5
  },
  22: {
    id: 22,
    title: 'Stuffed Portobello Mushrooms',
    time: '30 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1000',
    category: 'Dinner',
    description: 'Large portobello mushroom caps stuffed with a savory mixture of vegetables, herbs, and cheese.',
    rating: 4.6,
    ingredients: [
      '4 large portobello mushroom caps',
      '1/2 cup breadcrumbs',
      '1/4 cup parmesan cheese, grated',
      '2 cloves garlic, minced',
      '1/4 cup sun-dried tomatoes, chopped',
      '2 tbsp fresh basil, chopped',
      '2 tbsp olive oil',
      '1/4 cup mozzarella cheese, shredded',
      'Salt and pepper to taste',
      'Fresh arugula for serving'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Remove stems from mushrooms and scrape out gills.',
      'Brush mushroom caps with olive oil and season with salt and pepper.',
      'Mix breadcrumbs, parmesan, garlic, sun-dried tomatoes, and basil.',
      'Drizzle mixture with remaining olive oil.',
      'Fill mushroom caps with breadcrumb mixture.',
      'Top with mozzarella cheese.',
      'Bake for 15-20 minutes until mushrooms are tender and cheese is melted.',
      'Serve hot over arugula.'
    ],
    nutritionFacts: {
      calories: 260,
      protein: 16,
      carbs: 18,
      fat: 14
    },
    preparationTime: 15,
    cookingTime: 15
  },
  23: {
    id: 23,
    title: 'Greek Chicken Bowls',
    time: '25 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?q=80&w=1000',
    category: 'Lunch',
    description: 'Mediterranean-inspired bowls with marinated chicken, fresh vegetables, and tangy tzatziki sauce.',
    rating: 4.7,
    ingredients: [
      '1 lb chicken breast, cubed',
      '2 tbsp olive oil',
      '2 tbsp lemon juice',
      '2 tsp oregano',
      '2 cups cooked quinoa',
      '1 cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/4 red onion, sliced',
      '1/2 cup kalamata olives',
      '1/4 cup feta cheese, crumbled',
      '1/4 cup tzatziki sauce',
      'Fresh dill for garnish'
    ],
    instructions: [
      'Marinate chicken with olive oil, lemon juice, and oregano for 15 minutes.',
      'Cook chicken in a hot skillet for 6-8 minutes until cooked through.',
      'Divide quinoa among serving bowls.',
      'Top with cooked chicken, cucumber, tomatoes, red onion, and olives.',
      'Sprinkle with feta cheese.',
      'Drizzle with tzatziki sauce.',
      'Garnish with fresh dill and serve.'
    ],
    nutritionFacts: {
      calories: 420,
      protein: 32,
      carbs: 28,
      fat: 20
    },
    preparationTime: 20,
    cookingTime: 5
  },
  24: {
    id: 24,
    title: 'Keto Cauliflower Mac and Cheese',
    time: '40 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1000',
    category: 'Dinner',
    description: 'A low-carb twist on classic mac and cheese using cauliflower and a rich, creamy cheese sauce.',
    rating: 4.4,
    ingredients: [
      '1 large head cauliflower, cut into florets',
      '1 cup heavy cream',
      '4 oz cream cheese, softened',
      '2 cups sharp cheddar cheese, shredded',
      '1/2 cup parmesan cheese, grated',
      '2 tbsp butter',
      '2 cloves garlic, minced',
      '1 tsp mustard powder',
      '1/4 tsp paprika',
      'Salt and pepper to taste',
      '2 tbsp chives, chopped'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Steam cauliflower florets until tender, about 8 minutes. Drain well.',
      'In a saucepan, melt butter and sauté garlic for 1 minute.',
      'Add heavy cream and cream cheese, whisk until smooth.',
      'Stir in cheddar cheese, parmesan, mustard powder, and paprika.',
      'Season with salt and pepper.',
      'Place cauliflower in a baking dish and pour cheese sauce over.',
      'Bake for 20-25 minutes until bubbly and golden.',
      'Garnish with chives before serving.'
    ],
    nutritionFacts: {
      calories: 340,
      protein: 18,
      carbs: 12,
      fat: 26
    },
    preparationTime: 15,
    cookingTime: 25
  },
  25: {
    id: 25,
    title: 'Trail Mix Granola Bars',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1000',
    category: 'Snack',
    description: 'Homemade granola bars packed with nuts, seeds, dried fruit, and chocolate chips for the perfect on-the-go snack.',
    rating: 4.2,
    ingredients: [
      '2 cups old-fashioned oats',
      '1/2 cup almonds, chopped',
      '1/4 cup pumpkin seeds',
      '1/4 cup dried cranberries',
      '1/4 cup mini chocolate chips',
      '1/3 cup honey',
      '1/4 cup almond butter',
      '2 tbsp coconut oil',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon',
      'Pinch of salt'
    ],
    instructions: [
      'Line an 8x8 baking pan with parchment paper.',
      'In a large bowl, mix oats, almonds, pumpkin seeds, cranberries, and chocolate chips.',
      'In a small saucepan, warm honey, almond butter, and coconut oil until smooth.',
      'Stir in vanilla, cinnamon, and salt.',
      'Pour wet ingredients over dry ingredients and mix well.',
      'Press mixture firmly into prepared pan.',
      'Refrigerate for at least 2 hours until set.',
      'Cut into bars and store in refrigerator.'
    ],
    nutritionFacts: {
      calories: 220,
      protein: 8,
      carbs: 28,
      fat: 9
    },
    preparationTime: 15,
    cookingTime: 5
  },
  26: {
    id: 26,
    title: 'Vanilla Bean Panna Cotta',
    time: '4 hours',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1000',
    category: 'Dessert',
    description: 'An elegant Italian dessert with a silky smooth texture and delicate vanilla flavor. Perfect for special occasions.',
    rating: 4.6,
    ingredients: [
      '1 packet unflavored gelatin',
      '3 tbsp cold water',
      '2 cups heavy cream',
      '1/2 cup sugar',
      '1 vanilla bean, split and scraped',
      '1/4 cup whole milk',
      'Fresh berries for serving',
      'Mint leaves for garnish'
    ],
    instructions: [
      'Sprinkle gelatin over cold water in a small bowl. Let bloom for 5 minutes.',
      'In a saucepan, combine cream, sugar, vanilla bean seeds and pod.',
      'Heat over medium heat until sugar dissolves and mixture is hot but not boiling.',
      'Remove from heat and whisk in bloomed gelatin until dissolved.',
      'Strain mixture to remove vanilla pod.',
      'Stir in milk.',
      'Divide among 6 ramekins and refrigerate for at least 4 hours.',
      'Serve chilled topped with fresh berries and mint.'
    ],
    nutritionFacts: {
      calories: 280,
      protein: 6,
      carbs: 22,
      fat: 18
    },
    preparationTime: 20,
    cookingTime: 240
  }
};

// Food facts related to ingredients and cooking
const getRecipeRelatedFact = (recipeId: number) => {
  const facts = [
    {
      title: "Greek Yogurt Power",
      fact: "Greek yogurt contains probiotics that support digestive health and has double the protein of regular yogurt, making it perfect for muscle building and weight management.",
      source: "Harvard Medical School"
    },
    {
      title: "Salmon Omega-3 Benefits",
      fact: "Salmon is rich in omega-3 fatty acids EPA and DHA, which reduce inflammation and support brain health. Just one serving provides your daily omega-3 needs!",
      source: "American Heart Association"
    },
    {
      title: "Tomatoes and Lycopene",
      fact: "Cooking tomatoes increases lycopene absorption by up to 5 times! This powerful antioxidant helps protect against heart disease and certain cancers.",
      source: "Journal of Nutrition"
    },
    {
      title: "Avocado Healthy Fats",
      fact: "Avocados contain monounsaturated fats that help absorb fat-soluble vitamins (A, D, E, K) from other foods. They also support heart health and satiety.",
      source: "Nutrition Reviews"
    },
    {
      title: "Eggs Complete Protein",
      fact: "Eggs contain all 9 essential amino acids, making them a 'complete protein'. The yolk contains choline, which is crucial for brain development and function.",
      source: "Academy of Nutrition and Dietetics"
    },
    {
      title: "Mushroom Nutrition",
      fact: "Mushrooms are the only non-animal food source that naturally contains vitamin D when exposed to UV light. They're also rich in selenium and potassium.",
      source: "Mushroom Council"
    }
  ];
  
  return facts[recipeId - 1] || facts[0];
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? recipeDetails[Number(id)] : null;
  const { toast } = useToast();
  const relatedFact = recipe ? getRecipeRelatedFact(recipe.id) : null;
  
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
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
          
          {/* Food Fact Section */}
          {relatedFact && (
            <div className="mt-8">
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded-full">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                    </div>
                    <CardTitle className="text-lg text-amber-800">Nutrition Fact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-amber-900 mb-2">{relatedFact.title}</h4>
                  <CardDescription className="text-amber-800 leading-relaxed mb-3">
                    {relatedFact.fact}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700 font-medium">
                      Source: {relatedFact.source}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => window.open('/food-facts', '_blank')}
                      className="p-0 h-auto text-amber-700 hover:text-amber-800"
                    >
                      <span className="mr-1">More facts</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
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
