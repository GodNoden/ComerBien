// Imports de imágenes locales
import huevosRancheros from '@/assets/huevos-rancheros.jpg';
import tacosPescadoPastor from '@/assets/tacos-pescado-pastor.jpg';
import molePoblanoPollo from '@/assets/mole-poblano-pollo.jpg';
import tresLeches from '@/assets/tres-leches.jpg';
import chilaquilesVerdes from '@/assets/chilaquiles-verdes.jpg';
import cochinita from '@/assets/cochinita-pibil.jpg';
import bowlQuinoaNopales from '@/assets/bowl-quinoa-nopales.jpg';
import ensaladaPolloAguacate from '@/assets/ensalada-pollo-aguacate.jpg';
import aguaChiaLimon from '@/assets/agua-chia-limon.jpg';
import frijolesCharros from '@/assets/frijoles-charros.jpg';
import bolitasAmaranto from '@/assets/bolitas-amaranto.jpg';
import chilesRellenosQueso from '@/assets/chiles-rellenos-queso.jpg';
import molletesFrijoles from '@/assets/molletes-frijoles.jpg';
import pescadoVeracruzana from '@/assets/pescado-veracruzana.jpg';
import tacosFrijolNopales from '@/assets/tacos-frijol-nopales.jpg';
import licuadoPlatanoAvena from '@/assets/licuado-platano-avena.jpg';
import polloSalsaVerde from '@/assets/pollo-salsa-verde.jpg';
import sopaTortilla from '@/assets/sopa-tortilla.jpg';
import browniesChocolate from '@/assets/brownies-chocolate-mexicano.jpg';
import wrapsLechugaPollo from '@/assets/wraps-lechuga-pollo.jpg';
import hotcakesAvena from '@/assets/hotcakes-avena.jpg';
import hongosPortobello from '@/assets/hongos-portobello-rellenos.jpg';
import bowlMexicanoPollo from '@/assets/bowl-mexicano-pollo.jpg';
import coliflorGratinada from '@/assets/coliflor-gratinada.jpg';
import barritasGranola from '@/assets/barritas-granola.jpg';
import flanVainilla from '@/assets/flan-vainilla.jpg';

// Recetas mexicanas auténticas con valores nutricionales
export const recipes = [
  {
    id: 1,
    title: 'Huevos Rancheros Tradicionales',
    time: '20 min',
    difficulty: 'easy' as const,
    image: 'https://www.daisybrand.com/wp-content/uploads/2019/12/huevos-racheros-770x628_6509.jpg',
    category: 'Desayuno',
    calories: 320,
    protein: 18,
    carbs: 24,
    fat: 16,
    tags: ['alto en proteína', 'vegetariano'],
    ingredients: [
      'Tortillas de maíz',
      'Huevos frescos',
      'Frijoles refritos',
      'Jitomates grandes',
      'Cebolla blanca',
      'Chiles serranos',
      'Ajo',
      'Queso fresco',
      'Crema mexicana',
      'Cilantro fresco',
      'Sal'
    ]
  },
  {
    id: 2,
    title: 'Tacos de Pescado al Pastor',
    time: '25 min',
    difficulty: 'medium' as const,
    image: 'https://www.nutrioli.com/wp-content/uploads/2016/07/Tacos-de-pescado-al-pastor-1.jpg',
    category: 'Comida',
    calories: 380,
    protein: 28,
    carbs: 32,
    fat: 14,
    tags: ['alto en proteína', 'bajo en carbos'],
    ingredients: [
      'Filete de pescado blanco',
      'Tortillas de maíz',
      'Piña',
      'Cebolla morada',
      'Chiles guajillo',
      'Chile ancho',
      'Ajo',
      'Orégano',
      'Comino',
      'Naranjas',
      'Cilantro',
      'Cebolla',
      'Salsa verde',
      'Sal y pimienta'
    ]
  },
  {
    id: 3,
    title: 'Mole Poblano con Pollo',
    time: '2 horas',
    difficulty: 'hard' as const,
    image: 'https://cdn.recetasderechupete.com/wp-content/uploads/2023/03/Mole-poblano-con-arroz.jpg',
    category: 'Cena',
    calories: 450,
    protein: 35,
    carbs: 28,
    fat: 22,
    tags: ['alto en proteína', 'tradicional']
  },
  {
    id: 4,
    title: 'Tres Leches Mexicana',
    time: '45 min',
    difficulty: 'medium' as const,
    image: 'https://i.ytimg.com/vi/n0ymEFZJBho/maxresdefault.jpg',
    category: 'Snack',
    calories: 320,
    protein: 8,
    carbs: 38,
    fat: 16,
    tags: ['vegetariano', 'alto en grasa']
  },
  {
    id: 5,
    title: 'Chilaquiles Verdes',
    time: '30 min',
    difficulty: 'easy' as const,
    image: chilaquilesVerdes,
    category: 'Desayuno',
    calories: 290,
    protein: 16,
    carbs: 22,
    fat: 15,
    tags: ['vegetariano', 'alto en proteína']
  },
  {
    id: 6,
    title: 'Cochinita Pibil Yucateca',
    time: '3 horas',
    difficulty: 'hard' as const,
    image: 'https://www.gob.mx/cms/uploads/article/main_image/25270/blog-cochinita-22-sep-fb.jpg',
    category: 'Cena',
    calories: 520,
    protein: 42,
    carbs: 18,
    fat: 32,
    tags: ['alto en proteína', 'alto en grasa']
  },
  {
    id: 7,
    title: 'Bowl de Quinoa con Nopales',
    time: '25 min',
    difficulty: 'easy' as const,
    image: 'https://cdn7.kiwilimon.com/recetaimagen/32317/640x640/37361.jpg.webp',
    category: 'Comida',
    calories: 350,
    protein: 15,
    carbs: 42,
    fat: 12,
    tags: ['vegetariano', 'alto en proteína', 'alto en carbos']
  },
  {
    id: 8,
    title: 'Ensalada de Pollo con Aguacate',
    time: '15 min',
    difficulty: 'easy' as const,
    image: ensaladaPolloAguacate,
    category: 'Comida',
    calories: 380,
    protein: 32,
    carbs: 8,
    fat: 24,
    tags: ['alto en proteína', 'bajo en carbos']
  },
  {
    id: 9,
    title: 'Agua de Chía con Limón',
    time: '5 min',
    difficulty: 'easy' as const,
    image: aguaChiaLimon,
    category: 'Desayuno',
    calories: 180,
    protein: 6,
    carbs: 14,
    fat: 11,
    tags: ['vegetariano', 'alto en grasa']
  },
  {
    id: 10,
    title: 'Frijoles Charros Picosos',
    time: '45 min',
    difficulty: 'medium' as const,
    image: frijolesCharros,
    category: 'Cena',
    calories: 320,
    protein: 18,
    carbs: 45,
    fat: 8,
    tags: ['vegetariano', 'alto en carbos']
  },
  {
    id: 11,
    title: 'Bolitas de Amaranto',
    time: '15 min',
    difficulty: 'easy' as const,
    image: bolitasAmaranto,
    category: 'Botana',
    calories: 140,
    protein: 6,
    carbs: 18,
    fat: 5,
    tags: ['vegetariano', 'alto en proteína']
  },
  {
    id: 12,
    title: 'Chiles Rellenos de Queso',
    time: '40 min',
    difficulty: 'medium' as const,
    image: 'https://www.cocinavital.mx/wp-content/uploads/2019/05/chiles-rellenos-queso-capeados-caldillo-jitomate.jpg',
    category: 'Cena',
    calories: 420,
    protein: 22,
    carbs: 18,
    fat: 28,
    tags: ['vegetariano', 'alto en grasa']
  },
  {
    id: 13,
    title: 'Molletes con Frijoles',
    time: '15 min',
    difficulty: 'easy' as const,
    image: molletesFrijoles,
    category: 'Desayuno',
    calories: 280,
    protein: 14,
    carbs: 36,
    fat: 8,
    tags: ['vegetariano', 'alto en carbos']
  },
  {
    id: 14,
    title: 'Pescado a la Veracruzana',
    time: '30 min',
    difficulty: 'medium' as const,
    image: 'https://www.maricruzavalos.com/wp-content/uploads/2023/03/pescado-a-la-veracruzana-recipe.jpg',
    category: 'Cena',
    calories: 250,
    protein: 35,
    carbs: 8,
    fat: 8,
    tags: ['alto en proteína', 'bajo en carbos']
  },
  {
    id: 15,
    title: 'Tacos de Frijol y Nopales',
    time: '20 min',
    difficulty: 'easy' as const,
    image: tacosFrijolNopales,
    category: 'Comida',
    calories: 290,
    protein: 12,
    carbs: 48,
    fat: 6,
    tags: ['vegetariano', 'alto en carbos']
  },
  {
    id: 16,
    title: 'Licuado de Plátano y Avena',
    time: '5 min',
    difficulty: 'easy' as const,
    image: licuadoPlatanoAvena,
    category: 'Desayuno',
    calories: 320,
    protein: 12,
    carbs: 52,
    fat: 8,
    tags: ['vegetariano', 'alto en carbos']
  },
  {
    id: 17,
    title: 'Pollo en Salsa Verde',
    time: '45 min',
    difficulty: 'medium' as const,
    image: 'https://cdn7.kiwilimon.com/recetaimagen/28688/640x640/29046.jpg.jpg',
    category: 'Cena',
    calories: 380,
    protein: 38,
    carbs: 12,
    fat: 20,
    tags: ['alto en proteína', 'bajo en carbos']
  },
  {
    id: 18,
    title: 'Sopa de Tortilla Mexicana',
    time: '35 min',
    difficulty: 'easy' as const,
    image: sopaTortilla,
    category: 'Comida',
    calories: 220,
    protein: 12,
    carbs: 28,
    fat: 8,
    tags: ['vegetariano', 'bajo en calorías']
  },
  {
    id: 19,
    title: 'Brownies de Chocolate Mexicano',
    time: '35 min',
    difficulty: 'medium' as const,
    image: browniesChocolate,
    category: 'Snack',
    calories: 280,
    protein: 6,
    carbs: 32,
    fat: 14,
    tags: ['vegetariano', 'alto en grasa']
  },
  {
    id: 20,
    title: 'Wraps de Lechuga con Pollo',
    time: '15 min',
    difficulty: 'easy' as const,
    image: 'https://d36fw6y2wq3bat.cloudfront.net/recipes/wraps-de-lechuga-rellenos-de-pollo-con-arroz/600/wraps-de-lechuga-rellenos-de-pollo-con-arroz_version_1675943436.jpg',
    category: 'Comida',
    calories: 200,
    protein: 28,
    carbs: 6,
    fat: 8,
    tags: ['alto en proteína', 'bajo en carbos']
  },
  {
    id: 21,
    title: 'Hotcakes de Avena Integral',
    time: '15 min',
    difficulty: 'easy' as const,
    image: 'https://granvita.com/wp-content/uploads/2020/06/receta_hot_cakes_avena_platano.jpg',
    category: 'Desayuno',
    calories: 250,
    protein: 12,
    carbs: 32,
    fat: 8,
    tags: ['vegetariano', 'alto en proteína']
  },
  {
    id: 22,
    title: 'Hongos Portobello Rellenos',
    time: '25 min',
    difficulty: 'medium' as const,
    image: 'https://resizer.glanacion.com/resizer/v2/portobellos-rellenos-con-SP3IYHRIWRAKLBYG47ABNPBDNM.jpg?auth=a941457d473d3622d9d39b632066b3f1ac941ab3ab0128c42f4f85f136af42ef&width=1280&height=854&quality=70&smart=true',
    category: 'Cena',
    calories: 180,
    protein: 12,
    carbs: 8,
    fat: 12,
    tags: ['vegetariano', 'bajo en carbos']
  },
  {
    id: 23,
    title: 'Bowl Mexicano de Pollo',
    time: '20 min',
    difficulty: 'easy' as const,
    image: 'https://kikkomanusa.com/sabor/wp-content/uploads/sites/6/2023/02/Chicken-Burrito-Bowls_Kikkoman.webp',
    category: 'Comida',
    calories: 420,
    protein: 35,
    carbs: 32,
    fat: 18,
    tags: ['alto en proteína', 'alto en carbos']
  },
  {
    id: 24,
    title: 'Coliflor Gratinada Baja en Carbos',
    time: '35 min',
    difficulty: 'medium' as const,
    image: coliflorGratinada,
    category: 'Cena',
    calories: 220,
    protein: 16,
    carbs: 8,
    fat: 14,
    tags: ['vegetariano', 'bajo en carbos', 'alto en grasa']
  },
  {
    id: 25,
    title: 'Barritas de Granola Casera',
    time: '20 min',
    difficulty: 'easy' as const,
    image: barritasGranola,
    category: 'Botana',
    calories: 180,
    protein: 6,
    carbs: 24,
    fat: 7,
    tags: ['vegetariano', 'alto en carbos']
  },
  {
    id: 26,
    title: 'Flan de Vainilla Mexicano',
    time: '4 horas',
    difficulty: 'medium' as const,
    image: flanVainilla,
    category: 'Snack',
    calories: 240,
    protein: 8,
    carbs: 28,
    fat: 12,
    tags: ['vegetariano', 'alto en grasa']
  }
];