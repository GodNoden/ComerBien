
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddToWeeklyMenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipeTitle: string;
  recipeId: number;
}

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
const mealTypes = ['desayuno', 'comida', 'cena', 'snack'];

const AddToWeeklyMenuDialog = ({ isOpen, onClose, recipeTitle, recipeId }: AddToWeeklyMenuDialogProps) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const { toast } = useToast();

  const handleAddToMenu = () => {
    if (!selectedDay || !selectedMealType) {
      toast({
        title: "Información faltante",
        description: "Por favor seleecione día y tipo de comida.",
        variant: "destructive",
      });
      return;
    }

    // Get existing meal plan or create empty one
    const existingMealPlan = JSON.parse(localStorage.getItem('weeklyMealPlan') || '{}');

    // Ensure the day exists
    if (!existingMealPlan[selectedDay]) {
      existingMealPlan[selectedDay] = { desayuno: [], comida: [], cena: [], snack: [] };
    }

    // Add recipe ID to the selected meal type
    if (!existingMealPlan[selectedDay][selectedMealType]) {
      existingMealPlan[selectedDay][selectedMealType] = [];
    }

    existingMealPlan[selectedDay][selectedMealType].push(recipeId);

    // Save back to localStorage
    localStorage.setItem('weeklyMealPlan', JSON.stringify(existingMealPlan));

    toast({
      title: "Añadir al menú semanal",
      description: `${recipeTitle} ha sido añadida al ${selectedDay} ${selectedMealType}.`,
    });

    onClose();
    setSelectedDay('');
    setSelectedMealType('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir al menú semanal</DialogTitle>
          <DialogDescription>
            Escoja que día le gustaría "{recipeTitle}" en su menú semanal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="day">Día de la semana</Label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un día" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meal-type">Tipo de comida</Label>
            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de comida" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((mealType) => (
                  <SelectItem key={mealType} value={mealType}>
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddToMenu}>
            Añadir al menú
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWeeklyMenuDialog;
