
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Plus } from 'lucide-react';

interface ShoppingListDialogProps {
    isOpen: boolean;
    onClose: () => void;
    ingredients: string[];
}

const ShoppingListDialog = ({ isOpen, onClose, ingredients }: ShoppingListDialogProps) => {
    const [editableIngredients, setEditableIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState('');

    useEffect(() => {
        setEditableIngredients([...ingredients]);
    }, [ingredients]);

    const removeIngredient = (index: number) => {
        setEditableIngredients(prev => prev.filter((_, i) => i !== index));
    };

    const addIngredient = () => {
        if (newIngredient.trim()) {
            setEditableIngredients(prev => [...prev, newIngredient.trim()]);
            setNewIngredient('');
        }
    };

    const editIngredient = (index: number, newValue: string) => {
        setEditableIngredients(prev => prev.map((item, i) => i === index ? newValue : item));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Shopping List</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <div className="flex gap-2 mb-4">
                        <Input
                            placeholder="Add new ingredient..."
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                        />
                        <Button onClick={addIngredient} size="sm">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {editableIngredients.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No ingredients in your shopping list</p>
                        ) : (
                            editableIngredients.map((ingredient, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                                    <Input
                                        value={ingredient}
                                        onChange={(e) => editIngredient(index, e.target.value)}
                                        className="border-none shadow-none p-0 focus-visible:ring-0"
                                    />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeIngredient(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                // Here you could implement functionality to export or print the list
                                console.log('Shopping list:', editableIngredients);
                            }}
                        >
                            Export List
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShoppingListDialog;
