import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink } from 'lucide-react';
const InfoCards = () => {
    const navigate = useNavigate();
    const foodFacts = [{
        title: "Orange Juice vs Whole Orange",
        fact: "Orange juice is mainly sugar. Consider eating the whole orange if you want to enjoy this delicious fruit!",
        source: "Harvard T.H. Chan School of Public Health",
        sourceUrl: "https://www.hsph.harvard.edu/nutritionsource/healthy-drinks/beverages-public-health-concerns/"
    }, {
        title: "Nuts Nutrition",
        fact: "A handful of nuts (about 1 oz) contains around 160-200 calories but provides healthy fats and protein.",
        source: "American Heart Association",
        sourceUrl: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/nuts-and-heart-health"
    }, {
        title: "Greek Yogurt Benefits",
        fact: "Greek yogurt has twice the protein of regular yogurt, making it a more filling snack option.",
        source: "Mayo Clinic",
        sourceUrl: "https://www.mayoclinic.org/healthy-living/nutrition-and-healthy-eating/in-depth/greek-yogurt/art-20046722"
    }];
    return <div className="fixed bottom-6 right-6 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-lg border z-50">



    </div>;
};
export default InfoCards;