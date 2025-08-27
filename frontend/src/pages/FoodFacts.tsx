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
      title: "Orange Juice vs Whole Oranges",
      category: "Fruits",
      fact: "Orange juice is mainly sugar and lacks the fiber found in whole oranges. A glass of orange juice contains about 21g of sugar and very little fiber, while a whole orange has only 12g of sugar and 3g of fiber that helps slow sugar absorption.",
      details: "When you drink orange juice, you consume the sugar from multiple oranges without the beneficial fiber. This causes a rapid spike in blood sugar levels. Eating whole oranges provides vitamins, minerals, fiber, and antioxidants while naturally limiting portion size.",
      healthTip: "Choose whole oranges over juice to get more nutrients and better blood sugar control.",
      source: "Harvard T.H. Chan School of Public Health",
      sourceUrl: "https://www.hsph.harvard.edu/nutritionsource/healthy-drinks/beverages-public-health-concerns/"
    },
    {
      id: 2,
      title: "The Power of Nuts",
      category: "Proteins & Fats",
      fact: "A small handful of nuts (about 1 oz or 23 almonds) contains 160-200 calories but provides healthy monounsaturated fats, protein, fiber, vitamin E, and magnesium.",
      details: "Despite being calorie-dense, nuts don't contribute to weight gain when eaten in moderation. They're associated with reduced risk of heart disease, diabetes, and certain cancers. The combination of healthy fats, protein, and fiber makes them very satisfying.",
      healthTip: "Stick to a small handful daily - pre-portion nuts to avoid overeating.",
      source: "American Heart Association",
      sourceUrl: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/nuts-and-heart-health"
    },
    {
      id: 3,
      title: "Greek Yogurt Advantage",
      category: "Dairy",
      fact: "Greek yogurt contains twice the protein of regular yogurt (15-20g vs 8-10g per serving) and less sugar, making it a more filling and nutritious choice.",
      details: "The straining process that creates Greek yogurt removes whey, concentrating the protein and creating a thicker texture. Higher protein content helps with satiety, muscle building, and maintaining stable blood sugar levels throughout the day.",
      healthTip: "Choose plain Greek yogurt and add your own fruits to avoid added sugars.",
      source: "Mayo Clinic",
      sourceUrl: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/greek-yogurt/art-20046722"
    },
    {
      id: 4,
      title: "Whole Grains vs Refined Grains",
      category: "Carbohydrates",
      fact: "Whole grains retain all parts of the grain kernel, providing fiber, B vitamins, and minerals that are stripped away in refined grains.",
      details: "Refined grains like white bread and white rice have been processed to remove the bran and germ, eliminating most of the fiber, vitamins, and minerals. This processing also causes faster digestion and blood sugar spikes. Whole grains help maintain steady energy levels and support digestive health.",
      healthTip: "Look for '100% whole grain' on labels and choose brown rice, quinoa, and whole wheat bread.",
      source: "Whole Grains Council",
      sourceUrl: "https://wholegrainscouncil.org/whole-grains-101/what-are-health-benefits"
    },
    {
      id: 5,
      title: "Hidden Sodium in Processed Foods",
      category: "Processing",
      fact: "About 70% of sodium in the American diet comes from packaged and restaurant foods, not the salt shaker.",
      details: "Many foods that don't taste salty are actually high in sodium, including bread, cereals, deli meats, canned soups, and condiments. Excess sodium can lead to high blood pressure, heart disease, and stroke. Reading nutrition labels is crucial for managing sodium intake.",
      healthTip: "Aim for less than 2,300mg of sodium per day and choose fresh, whole foods when possible.",
      source: "CDC",
      sourceUrl: "https://www.cdc.gov/salt/index.htm"
    },
    {
      id: 6,
      title: "Avocado: Fruit or Fat?",
      category: "Fruits",
      fact: "Avocados are technically fruits but nutritionally function more like healthy fats, with about 15g of monounsaturated fat per half avocado.",
      details: "Unlike most fruits that are primarily carbohydrates, avocados are rich in heart-healthy monounsaturated fats, fiber, potassium, and folate. These healthy fats help with nutrient absorption, especially fat-soluble vitamins A, D, E, and K.",
      healthTip: "Add avocado to salads to boost nutrient absorption from vegetables.",
      source: "National Institutes of Health",
      sourceUrl: "https://www.niddk.nih.gov/health-information/weight-management/healthy-eating-physical-activity-for-life"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Fruits": "bg-green-100 text-green-800 border-green-200",
      "Proteins & Fats": "bg-orange-100 text-orange-800 border-orange-200", 
      "Dairy": "bg-blue-100 text-blue-800 border-blue-200",
      "Carbohydrates": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Processing": "bg-red-100 text-red-800 border-red-200"
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
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Food Facts</h1>
                <p className="text-gray-600 text-sm">Learn the science behind your food choices</p>
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
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Quick Fact</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {fact.fact}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">Why It Matters</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {fact.details}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <h4 className="font-medium text-green-800 mb-1 text-sm">💡 Health Tip</h4>
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
                    <span>Source: {fact.source}</span>
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