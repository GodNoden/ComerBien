import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Lightbulb } from 'lucide-react';

const InfoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const foodFacts = [
    {
      fact: "Orange juice is mainly sugar. Consider eating the whole orange if you want to enjoy this delicious fruit!",
      source: "Harvard T.H. Chan School of Public Health",
      sourceUrl: "https://www.hsph.harvard.edu/nutritionsource/healthy-drinks/beverages-public-health-concerns/"
    },
    {
      fact: "A handful of nuts (about 1 oz) contains around 160-200 calories but provides healthy fats and protein.",
      source: "American Heart Association",
      sourceUrl: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/nuts-and-heart-health"
    },
    {
      fact: "Greek yogurt has twice the protein of regular yogurt, making it a more filling snack option.",
      source: "Mayo Clinic",
      sourceUrl: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/greek-yogurt/art-20046722"
    }
  ];

  const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];

  useEffect(() => {
    const lastShown = localStorage.getItem('foodtrack_tip_shown');
    const today = new Date().toDateString();

    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('foodtrack_tip_shown', today);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Did you know?
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {randomFact.fact}
          </p>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Source: {" "}
              <a
                href={randomFact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {randomFact.source}
              </a>
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                navigate('/food-facts');
              }}
              className="text-primary hover:text-primary/80"
            >
              See all facts
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPopup;