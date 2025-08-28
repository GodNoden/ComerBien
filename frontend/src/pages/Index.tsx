
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
      title: "Orange Juice vs Whole Orange",
      fact: "Orange juice is mainly sugar. Consider eating the whole orange if you want to enjoy this delicious fruit!",
      source: "Harvard T.H. Chan School of Public Health"
    },
    {
      title: "Nuts Nutrition Power",
      fact: "A handful of nuts (about 1 oz) contains around 160-200 calories but provides healthy fats and protein.",
      source: "American Heart Association"
    },
    {
      title: "Greek Yogurt Benefits",
      fact: "Greek yogurt has twice the protein of regular yogurt, making it a more filling snack option.",
      source: "Mayo Clinic"
    },
    {
      title: "Fiber for Fullness",
      fact: "Foods high in fiber help you feel full longer and can aid in weight management.",
      source: "Academy of Nutrition and Dietetics"
    },
    {
      title: "Hydration Matters",
      fact: "Sometimes when you think you're hungry, you might actually just be thirsty. Try drinking water first!",
      source: "Mayo Clinic"
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
      
      {/* Nutrition Tips Banner */}
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
                Nutrition Tip of the Day
              </h1>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{currentTip.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-3">
                {currentTip.fact}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span>Source: {currentTip.source}</span>
                <div className="flex items-center gap-1">
                  <span>View all facts</span>
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
