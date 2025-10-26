import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FoodFacts = () => {
  const navigate = useNavigate();

  const foodFacts = [
    {
      id: 1,
      title: "Aguacate vs Otros Aceites",
      category: "Grasas Saludables",
      fact: "El aceite de aguacate mexicano tiene un punto de humo más alto que el aceite de oliva (271°C vs 190°C), siendo ideal para cocinar a altas temperaturas sin perder propiedades.",
      details: "El aguacate mexicano contiene ácido oleico, el mismo tipo de grasa monoinsaturada que hace famoso al aceite de oliva, pero en mayor concentración. Además, mejora la absorción de carotenoides de otros vegetales hasta en 15 veces.",
      healthTip: "Agrega aguacate a tus ensaladas para absorber mejor las vitaminas A, D, E y K de las verduras.",
      source: "Instituto Nacional de Investigaciones Forestales, Agrícolas y Pecuarias",
      sourceUrl: "https://www.gob.mx/inifap"
    },
    {
      id: 2,
      title: "Poder Nutricional del Chile",
      category: "Antioxidantes",
      fact: "Los chiles mexicanos contienen más vitamina C que las naranjas. Un chile habanero tiene 357mg de vitamina C por 100g, mientras que la naranja tiene solo 53mg.",
      details: "La capsaicina en los chiles no solo da el picor, sino que también acelera el metabolismo hasta en un 25% durante 3 horas después de comer. Los chiles también son ricos en capsantina, un antioxidante que protege contra el cáncer.",
      healthTip: "Incluye chiles frescos en tu dieta diaria para aumentar tu metabolismo naturalmente.",
      source: "Universidad Nacional Autónoma de México - Instituto de Biología",
      sourceUrl: "https://www.unam.mx"
    },
    {
      id: 3,
      title: "Frijoles: Proteína Completa Mexicana",
      category: "Proteínas",
      fact: "La combinación tradicional mexicana de frijoles con maíz (tortillas) crea una proteína completa con todos los aminoácidos esenciales, equivalente a la carne.",
      details: "Los frijoles negros mexicanos contienen 21g de proteína por taza cocida y son ricos en folato, magnesio y fibra. Esta combinación milenaria era la base nutricional de las civilizaciones mesoamericanas y sigue siendo perfecta nutricionalmente.",
      healthTip: "Come frijoles con tortillas de maíz para obtener proteína completa sin necesidad de carne.",
      source: "Secretaría de Agricultura y Desarrollo Rural",
      sourceUrl: "https://www.gob.mx/agricultura"
    },
    {
      id: 4,
      title: "Nopal: El Súper Alimento Azteca",
      category: "Fibra y Control Glucémico",
      fact: "El nopal contiene betalains, antioxidantes únicos que le dan su color y tienen propiedades antiinflamatorias superiores a la vitamina C.",
      details: "Una taza de nopal crudo tiene solo 14 calorías pero 2g de fibra soluble que ayuda a controlar el azúcar en sangre. Los estudios muestran que comer nopal antes de las comidas puede reducir los picos de glucosa en un 48%.",
      healthTip: "Come ensalada de nopales antes de comidas abundantes para controlar mejor el azúcar en sangre.",
      source: "Instituto Mexicano del Seguro Social - Investigación Nutricional",
      sourceUrl: "https://www.imss.gob.mx"
    },
    {
      id: 5,
      title: "Cacao Mexicano Original",
      category: "Antioxidantes",
      fact: "El cacao mexicano crudo contiene más antioxidantes que el té verde, vino tinto y arándanos combinados, con un valor ORAC de 95,500 por 100g.",
      details: "El cacao original de México contiene teobromina, que mejora el flujo sanguíneo al cerebro, y flavonoides que pueden reducir la presión arterial. Los aztecas lo consideraban la bebida de los dioses por sus propiedades energéticas y mentales.",
      healthTip: "Elige chocolate con al menos 70% de cacao mexicano para obtener máximos beneficios antioxidantes.",
      source: "CONACYT - Centro de Investigación en Alimentación y Desarrollo",
      sourceUrl: "https://www.conacyt.gob.mx"
    },
    {
      id: 6,
      title: "Chia: Semilla Ancestral Mexicana",
      category: "Omega-3 y Fibra",
      fact: "Las semillas de chía mexicanas contienen 8 veces más omega-3 que el salmón por peso, además de ser fuente completa de proteína vegetal.",
      details: "Una cucharada de chía (15g) proporciona 5g de fibra, 3g de proteína y 2g de omega-3. Al contacto con líquido, forma un gel que ralentiza la digestión y ayuda a mantener estables los niveles de energía durante horas.",
      healthTip: "Remoja las semillas de chía 15 minutos antes de consumir para mejor digestión y absorción.",
      source: "Instituto Nacional de Pueblos Indígenas - Saberes Alimentarios",
      sourceUrl: "https://www.gob.mx/inpi"
    },
    {
      id: 7,
      title: "Amaranto: Pseudocereal Azteca",
      category: "Proteínas Completas",
      fact: "El amaranto mexicano es uno de los pocos vegetales que contiene proteína completa (16% por peso) y es naturalmente libre de gluten.",
      details: "El amaranto era tan valorado por los aztecas que lo usaban en ceremonias religiosas. Contiene lisina, aminoácido escaso en otros cereales, y escualeno, compuesto que ayuda a reducir el colesterol. Es más nutritivo que la quinoa y el arroz.",
      healthTip: "Sustituye el arroz por amaranto cocido para obtener más proteína y nutrientes.",
      source: "Universidad Autónoma Chapingo - Departamento de Nutrición",
      sourceUrl: "https://www.chapingo.mx"
    },
    {
      id: 8,
      title: "Quelites: Verduras Silvestres Mexicanas",
      category: "Micronutrientes",
      fact: "Los quelites (verdolagas, quintoniles, huazontles) contienen hasta 7 veces más vitaminas y minerales que las verduras comerciales modernas.",
      details: "Las verdolagas, por ejemplo, son la fuente vegetal más rica en omega-3 y contienen más betacaroteno que las zanahorias. Los quelites fueron la base de la alimentación prehispánica y son extremadamente resistentes y nutritivos.",
      healthTip: "Incluye quelites en ensaladas, sopas y guisos para aumentar dramáticamente el valor nutricional.",
      source: "Jardín Botánico del Instituto de Biología UNAM",
      sourceUrl: "https://www.jardinbotanico.unam.mx"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string; } = {
      "Grasas Saludables": "bg-green-100 text-green-800 border-green-200",
      "Antioxidantes": "bg-purple-100 text-purple-800 border-purple-200",
      "Proteínas": "bg-orange-100 text-orange-800 border-orange-200",
      "Fibra y Control Glucémico": "bg-blue-100 text-blue-800 border-blue-200",
      "Omega-3 y Fibra": "bg-teal-100 text-teal-800 border-teal-200",
      "Proteínas Completas": "bg-red-100 text-red-800 border-red-200",
      "Micronutrientes": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Datos Nutricionales Mexicanos</h1>
                <p className="text-gray-600 text-sm">Descubre la ciencia detrás de los súper alimentos mexicanos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodFacts.map((fact) => (
            <Card key={fact.id} className="h-fit hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={getCategoryColor(fact.category)}
                  >
                    {fact.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                  {fact.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Dato Rápido</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {fact.fact}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Por Qué Importa</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {fact.details}
                    </p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <h4 className="font-medium text-green-800 mb-1 text-sm">💡 Consejo Saludable</h4>
                    <p className="text-green-700 text-sm">
                      {fact.healthTip}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <a
                    href={fact.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Fuente: {fact.source}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodFacts;