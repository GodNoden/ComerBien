
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const InfoCards = () => {
    const quickCalories = [
        { name: 'Bag of chips', calories: 210 },
        { name: 'Slice of bread', calories: 50 },
        { name: 'A tortilla', calories: 50 },
        { name: 'Apple', calories: 80 },
        { name: 'Banana', calories: 105 },
        { name: 'Cup of coffee', calories: 5 }
    ];

    const handleQuickAdd = (item: { name: string; calories: number; }) => {
        console.log(`Adding ${item.name} (${item.calories} kcal) to daily intake`);
        // Here you would implement the actual quick add functionality
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Understanding Food Better Card */}
            <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Understand Food Better</h3>
                    <p className="text-blue-700 text-sm">
                        This place is for people that want to understand food better and make informed choices about their nutrition.
                    </p>
                </CardContent>
            </Card>

            {/* Enjoy Food Consciously Card */}
            <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">❤️</div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Enjoy Food Consciously</h3>
                    <p className="text-green-700 text-sm">
                        I want you to enjoy the food that you always have enjoyed, but being conscious of it and your health goals.
                    </p>
                </CardContent>
            </Card>

            {/* Quick Calorie Reference Card */}
            <Card className="bg-linear-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                    <div className="text-center mb-4">
                        <div className="text-4xl mb-2">📊</div>
                        <h3 className="text-lg font-semibold text-orange-800">Quick Calories</h3>
                    </div>
                    <div className="space-y-2">
                        {quickCalories.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-orange-700">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-orange-800">{item.calories} kcal</span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-6 w-6 p-0 border-orange-300 hover:bg-orange-200"
                                        onClick={() => handleQuickAdd(item)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InfoCards;
