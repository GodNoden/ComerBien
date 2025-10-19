import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Utensils, Clock, Heart, Calendar, Lightbulb, ExternalLink } from 'lucide-react';
import AddToWeeklyMenuDialog from '@/components/AddToWeeklyMenuDialog';
import { useToast } from '@/hooks/use-toast';

// Recetas mexicanas auténticas con detalles completos
const recipeDetails = {
  1: {
    id: 1,
    title: 'Huevos Rancheros Tradicionales',
    time: '20 min',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1000',
    category: 'Desayuno',
    description: 'Clásico desayuno mexicano con huevos fritos sobre tortillas de maíz, bañados en salsa roja casera con frijoles refritos.',
    rating: 4.8,
    ingredients: [
      '4 tortillas de maíz',
      '4 huevos frescos',
      '1 taza de frijoles refritos',
      '2 jitomates grandes',
      '1/4 de cebolla blanca',
      '2 chiles serranos',
      '2 dientes de ajo',
      'Queso fresco desmoronado',
      'Crema mexicana',
      'Cilantro fresco',
      'Sal al gusto'
    ],
    instructions: [
      'Asa los jitomates, cebolla y chiles serranos en un comal hasta que estén suaves.',
      'Licúa los vegetales asados con ajo y sal para hacer la salsa roja.',
      'Calienta aceite en una sartén y fríe la salsa por 5 minutos.',
      'Calienta las tortillas en el comal hasta que estén suaves.',
      'Calienta los frijoles refritos en una olla pequeña.',
      'Fríe los huevos en aceite caliente hasta que la clara esté cocida pero la yema suave.',
      'Coloca las tortillas en platos, unta frijoles, pon el huevo encima y baña con salsa.',
      'Decora con queso fresco, crema, y cilantro.'
    ],
    nutritionFacts: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    preparationTime: 10,
    cookingTime: 10,
    nutritionTip: {
      fact: "Los frijoles son ricos en proteína vegetal y fibra. Combinados con el maíz de las tortillas forman una proteína completa.",
      tip: "Usa aceite de aguacate para freír - tiene mejor perfil nutricional que otros aceites."
    }
  },
  2: {
    id: 2,
    title: 'Tacos de Pescado al Pastor',
    time: '25 min',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1000',
    category: 'Almuerzo',
    description: 'Pescado blanco marinado con especias tipo pastor, servido en tortillas de maíz con piña asada y salsa verde.',
    rating: 4.7,
    ingredients: [
      '500g de filete de pescado blanco',
      '8 tortillas de maíz pequeñas',
      '2 rebanadas de piña',
      '1/4 de cebolla morada',
      '2 chiles guajillo',
      '1 chile ancho',
      '2 dientes de ajo',
      '1 cucharadita de orégano',
      '1/2 cucharadita de comino',
      'Jugo de 2 naranjas',
      'Cilantro y cebolla picada',
      'Salsa verde',
      'Sal y pimienta'
    ],
    instructions: [
      'Remoja los chiles en agua caliente por 15 minutos.',
      'Licúa los chiles con ajo, orégano, comino, jugo de naranja y sal.',
      'Marina el pescado en esta mezcla por 20 minutos.',
      'Asa el pescado en una parrilla o sartén caliente por 3-4 minutos por lado.',
      'Asa las rebanadas de piña hasta que estén caramelizadas.',
      'Calienta las tortillas en el comal.',
      'Corta el pescado en trozos y la piña en cubitos.',
      'Arma los tacos con pescado, piña, cebolla, cilantro y salsa verde.'
    ],
    nutritionFacts: {
      calories: 380,
      protein: 28,
      carbs: 32,
      fat: 14
    },
    preparationTime: 15,
    cookingTime: 10,
    nutritionTip: {
      fact: "El pescado blanco es una excelente fuente de proteína magra y ácidos grasos omega-3.",
      tip: "La piña contiene bromelina, una enzima que ayuda a la digestión de las proteínas."
    }
  },
  3: {
    id: 3,
    title: 'Mole Poblano con Pollo',
    time: '2 horas',
    difficulty: 'hard' as const,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000',
    category: 'Cena',
    description: 'El rey de la cocina mexicana: pollo en mole poblano con más de 20 ingredientes que crean una salsa compleja y deliciosa.',
    rating: 4.9,
    ingredients: [
      '1 pollo entero cortado en piezas',
      '6 chiles mulatos',
      '4 chiles anchos',
      '2 chiles pasilla',
      '2 chiles chipotle',
      '3 jitomates',
      '1 cebolla',
      '6 dientes de ajo',
      '1/4 taza de almendras',
      '2 cucharadas de ajonjolí',
      '1 rebanada de pan',
      '2 tortillas',
      '1 tablilla de chocolate mexicano',
      'Canela, clavo, pimienta gorda',
      'Sal al gusto'
    ],
    instructions: [
      'Cuece el pollo en agua con sal, cebolla y ajo. Reserva el caldo.',
      'Desvenar y tostar los chiles en comal sin quemar.',
      'Remojar chiles en agua caliente por 30 minutos.',
      'Tostar almendras, ajonjolí, pan y tortillas.',
      'Asar jitomates, cebolla y ajos.',
      'Licuar todos los ingredientes por grupos con el caldo de pollo.',
      'Colar la mezcla y freír en aceite caliente por 20 minutos.',
      'Agregar chocolate y especias, cocinar 40 minutos más.',
      'Servir el pollo bañado en mole con arroz rojo.'
    ],
    nutritionFacts: {
      calories: 450,
      protein: 35,
      carbs: 28,
      fat: 22
    },
    preparationTime: 60,
    cookingTime: 60,
    nutritionTip: {
      fact: "El chocolate mexicano contiene flavonoides que mejoran la salud cardiovascular.",
      tip: "Los chiles aportan capsaicina que acelera el metabolismo y vitamina C."
    }
  },
  4: {
    id: 4,
    title: 'Tres Leches Mexicana',
    time: '45 min',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000',
    category: 'Postre',
    description: 'Esponjoso bizcocho empapado en mezcla de tres leches y coronado con merengue suave, el postre más amado de México.',
    rating: 4.8,
    ingredients: [
      '5 huevos separados',
      '1 taza de azúcar',
      '1/3 taza de leche entera',
      '1 cucharadita de vainilla',
      '1 taza de harina',
      '1 1/2 cucharaditas de polvo para hornear',
      '1 lata de leche evaporada',
      '1 lata de leche condensada',
      '1/2 taza de crema para batir',
      'Canela molida para decorar'
    ],
    instructions: [
      'Precalienta el horno a 180°C. Engrasa un molde rectangular.',
      'Bate las yemas con 3/4 de taza de azúcar hasta que blanqueen.',
      'Agrega leche y vainilla a las yemas.',
      'Incorpora harina y polvo para hornear tamizados.',
      'Bate las claras a punto de nieve y agrega el azúcar restante.',
      'Incorpora las claras a la mezcla con movimientos envolventes.',
      'Hornea 25-30 minutos hasta que esté dorado.',
      'Mezcla las tres leches y vierte sobre el pastel tibio.',
      'Refrigera 3 horas. Decora con merengue y canela.'
    ],
    nutritionFacts: {
      calories: 320,
      protein: 8,
      carbs: 38,
      fat: 16
    },
    preparationTime: 20,
    cookingTime: 25,
    nutritionTip: {
      fact: "Las leches aportan calcio y proteínas de alta calidad esenciales para huesos y músculos.",
      tip: "Disfruta con moderación - es alto en calorías pero aporta nutrientes importantes."
    }
  },
  5: {
    id: 5,
    title: 'Chilaquiles Verdes',
    time: '30 min',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1000',
    category: 'Desayuno',
    description: 'Totopos bañados en salsa verde de tomate, corona con queso fresco, crema y cebolla. Perfecto para el desayuno.',
    rating: 4.6,
    ingredients: [
      'Totopos (tortillas fritas)',
      '10 tomates verdes',
      '2 chiles serranos',
      '1/4 de cebolla blanca',
      '2 dientes de ajo',
      'Queso fresco',
      'Crema mexicana',
      'Cebolla morada en rodajas',
      'Cilantro fresco',
      'Sal al gusto'
    ],
    instructions: [
      'Hierve los tomates verdes con chiles serranos hasta que estén suaves.',
      'Licúa tomates, chiles, cebolla, ajo y sal con un poco del agua de cocción.',
      'Fríe la salsa en aceite caliente por 10 minutos.',
      'Agrega los totopos a la salsa y mezcla suavemente.',
      'Cocina por 5 minutos hasta que los totopos absorban la salsa.',
      'Sirve inmediatamente decorado con queso fresco desmoronado.',
      'Agrega crema, cebolla morada y cilantro al gusto.'
    ],
    nutritionFacts: {
      calories: 290,
      protein: 16,
      carbs: 22,
      fat: 15
    },
    preparationTime: 15,
    cookingTime: 15,
    nutritionTip: {
      fact: "Los tomates verdes son ricos en vitamina C y antioxidantes que fortalecen el sistema inmune.",
      tip: "Prepara tus propios totopos horneados para reducir el contenido de grasa."
    }
  },
  6: {
    id: 6,
    title: 'Cochinita Pibil Yucateca',
    time: '3 horas',
    difficulty: 'hard' as const,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000',
    category: 'Cena',
    description: 'Cerdo marinado en achiote y envuelto en hojas de plátano, cocido lentamente hasta lograr textura suave y sabor único.',
    rating: 4.9,
    ingredients: [
      '2 kg de carne de cerdo (pierna o paleta)',
      '100g de pasta de achiote',
      'Jugo de 8 naranjas agrias',
      '6 dientes de ajo',
      '1 cucharadita de orégano yucateco',
      '1 cucharadita de pimienta gorda',
      '1 cucharadita de comino',
      'Hojas de plátano',
      'Cebolla morada en escabeche',
      'Tortillas de maíz',
      'Sal al gusto'
    ],
    instructions: [
      'Corta la carne en trozos medianos y salpimienta.',
      'Licúa achiote, jugo de naranja, ajo y especias.',
      'Marina la carne en esta mezcla por mínimo 4 horas.',
      'Envuelve la carne marinada en hojas de plátano.',
      'Cocina en horno a 160°C por 2.5-3 horas hasta que esté suave.',
      'Deshebra la carne y mezcla con sus jugos.',
      'Sirve en tortillas con cebolla encurtida.'
    ],
    nutritionFacts: {
      calories: 520,
      protein: 42,
      carbs: 18,
      fat: 32
    },
    preparationTime: 30,
    cookingTime: 180,
    nutritionTip: {
      fact: "El achiote contiene carotenoides con propiedades antioxidantes y antiinflamatorias.",
      tip: "La cocción lenta preserva más nutrientes que métodos de alta temperatura."
    }
  }
  // Continuaría con las otras 20 recetas...
};

// Función para generar datos nutricionales contextuales
const getFoodFactForRecipe = (recipeId: number) => {
  const facts: { [key: number]: any; } = {
    1: {
      title: "Poder Nutricional de los Frijoles",
      fact: "Los frijoles en los huevos rancheros aportan proteína vegetal completa cuando se combinan con las tortillas de maíz. Una taza de frijoles tiene 15g de proteína y 13g de fibra.",
      source: "Instituto Nacional de Ciencias Médicas y Nutrición"
    },
    2: {
      title: "Beneficios del Pescado Blanco",
      fact: "El pescado blanco como el usado en estos tacos es bajo en grasa pero alto en proteína (20g por 100g) y rico en vitaminas del complejo B.",
      source: "Secretaría de Salud México"
    },
    3: {
      title: "Antioxidantes en el Mole",
      fact: "Los chiles del mole contienen capsantina y otros carotenoides. El chocolate aporta flavonoides que mejoran la función cardiovascular.",
      source: "UNAM - Instituto de Química"
    }
  };

  return facts[recipeId] || {
    title: "Sabiduría Nutricional Mexicana",
    fact: "La cocina mexicana tradicional combina ingredientes que se complementan nutricionalmente, creando comidas balanceadas naturalmente.",
    source: "Patrimonio Cultural Alimentario de México"
  };
};

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [addToMenuOpen, setAddToMenuOpen] = useState(false);

  const recipe = recipeDetails[parseInt(id!) as keyof typeof recipeDetails];
  const foodFact = getFoodFactForRecipe(parseInt(id!));

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Receta no encontrada</h2>
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Eliminada de favoritos" : "Agregada a favoritos",
      description: `${recipe.title} ${isFavorited ? 'fue eliminada de' : 'fue agregada a'} tus favoritos.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver a recetas
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image and Basic Info */}
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFavorite}
                  className={isFavorited ? 'text-red-500 border-red-200' : ''}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favorito' : 'Agregar a favoritos'}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setAddToMenuOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agregar al menú
                </Button>
              </div>
            </div>
          </div>

          {/* Recipe Details */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {recipe.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
              <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{recipe.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-gray-500" />
                <span className="text-sm capitalize">{recipe.difficulty === 'easy' ? 'Fácil' : recipe.difficulty === 'medium' ? 'Medio' : 'Difícil'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">★ {recipe.rating}</span>
              </div>
            </div>

            {/* Nutrition Facts */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Información Nutricional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.nutritionFacts.calories}</div>
                    <div className="text-sm text-gray-600">Calorías</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{recipe.nutritionFacts.protein}g</div>
                    <div className="text-sm text-gray-600">Proteína</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{recipe.nutritionFacts.carbs}g</div>
                    <div className="text-sm text-gray-600">Carbohidratos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{recipe.nutritionFacts.fat}g</div>
                    <div className="text-sm text-gray-600">Grasa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cooking Times */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{recipe.preparationTime} min</div>
                    <div className="text-sm text-gray-600">Preparación</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">{recipe.cookingTime} min</div>
                    <div className="text-sm text-gray-600">Cocción</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Food Fact Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-lg text-green-800">{foodFact.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 leading-relaxed mb-3">{foodFact.fact}</p>
            <p className="text-sm text-green-600">Fuente: {foodFact.source}</p>
          </CardContent>
        </Card>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instrucciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Tip */}
        {recipe.nutritionTip && (
          <Card className="mt-8 bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Consejo Nutricional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-2"><strong>Dato:</strong> {recipe.nutritionTip.fact}</p>
              <p className="text-amber-600"><strong>Tip:</strong> {recipe.nutritionTip.tip}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AddToWeeklyMenuDialog
        isOpen={addToMenuOpen}
        onClose={() => setAddToMenuOpen(false)}
        recipeTitle={recipe.title}
        recipeId={recipe.id}
      />
    </div>
  );
};

export default RecipeDetail;