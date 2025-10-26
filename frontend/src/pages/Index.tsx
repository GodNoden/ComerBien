
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import ActionButtons from '@/components/ActionButtons';
import InfoPopup from '@/components/InfoPopup';

const Index = () => {
  const navigate = useNavigate();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nutritionTips = [
    {
      title: "Poder del Aguacate Mexicano",
      fact: "El aguacate es una fuente excelente de grasas saludables, fibra y potasio. Un aguacate mediano aporta el 20% del potasio diario requerido.",
      source: "Instituto Nacional de Ciencias Médicas y Nutrición"
    },
    {
      title: "Beneficios del Chile",
      fact: "Los chiles contienen capsaicina, que acelera el metabolismo y puede ayudar a quemar hasta 50 calorías adicionales por día.",
      source: "Universidad Nacional Autónoma de México"
    },
    {
      title: "Frijoles: Proteína Completa",
      fact: "Los frijoles combinados con maíz forman una proteína completa, proporcionando todos los aminoácidos esenciales.",
      source: "Secretaría de Salud México"
    },
    {
      title: "Nopal: Súper Alimento Mexicano",
      fact: "El nopal es rico en fibra, antioxidantes y ayuda a controlar los niveles de azúcar en la sangre naturalmente.",
      source: "Instituto Mexicano del Seguro Social"
    },
    {
      title: "Cacao Mexicano Original",
      fact: "El cacao puro mexicano es rico en flavonoides que mejoran la salud cardiovascular y la función cerebral.",
      source: "CONACYT - Centro de Investigación en Alimentación"
    }
  ];

  // Rotate tips every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % nutritionTips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentTip = nutritionTips[currentTipIndex];
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <button
        onClick={() => navigate('/food-facts')}
        className="w-full bg-gradient-to-r from-food-soft-blue to-food-light-green py-8 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 group"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                <Lightbulb className="h-6 w-6 text-amber-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                Consejo Nutricional del Día
              </h1>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{currentTip.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-3">
                {currentTip.fact}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span>Fuente: {currentTip.source}</span>
                <div className="flex items-center gap-1">
                  <span>Ver todos los consejos</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FeaturedRecipes />
      </main>

      <ActionButtons />
      <InfoPopup />
    </div>
  );
};

export default Index;
