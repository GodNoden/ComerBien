
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, CalendarDays } from 'lucide-react';
import InfoCards from '@/components/InfoCards';

const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed bottom-6 left-6 flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => navigate('/weekly-menu')}
          className="action-button bg-food-orange hover:bg-food-orange/90 text-white shadow-lg"
          aria-label="Create Weekly Menu"
        >
          <CalendarDays className="h-5 w-5" />
          <span className="hidden sm:inline">Menú Semanal</span>
        </Button>

        <Button
          onClick={() => navigate('/add-recipe')}
          className="action-button bg-primary hover:bg-primary/90 text-white shadow-lg"
          aria-label="Add Recipe"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Agregar Receta</span>
        </Button>
      </div>

      <InfoCards />
    </>
  );
};

export default ActionButtons;
