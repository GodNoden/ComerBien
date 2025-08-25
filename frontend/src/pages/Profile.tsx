
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const commonAllergens = [
    'Milk',
    'Eggs',
    'Fish',
    'Shellfish',
    'Tree nuts',
    'Peanuts',
    'Wheat',
    'Soybeans',
    'Sesame'
];

const commonDislikes = [
    'Mushrooms',
    'Onions',
    'Garlic',
    'Cilantro',
    'Olives',
    'Tomatoes',
    'Peppers',
    'Coconut',
    'Spicy food',
    'Seafood',
    'Red meat',
    'Dairy'
];

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [allergies, setAllergies] = useState<string[]>([]);
    const [dislikes, setDislikes] = useState<string[]>([]);

    // Personal information for calorie calculation
    const [personalInfo, setPersonalInfo] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        activityLevel: ''
    });

    const calculateRecommendedCalories = () => {
        const { age, height, weight, gender, activityLevel } = personalInfo;

        if (!age || !height || !weight || !gender || !activityLevel) {
            return 0;
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === 'male') {
            bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
        } else {
            bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
        }

        // Apply activity factor
        const activityFactors: { [key: string]: number; } = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'very': 1.725,
            'extreme': 1.9
        };

        return Math.round(bmr * activityFactors[activityLevel]);
    };

    const handleAllergyChange = (allergen: string, checked: boolean) => {
        if (checked) {
            setAllergies(prev => [...prev, allergen]);
        } else {
            setAllergies(prev => prev.filter(item => item !== allergen));
        }
    };

    const handleDislikeChange = (dislike: string, checked: boolean) => {
        if (checked) {
            setDislikes(prev => [...prev, dislike]);
        } else {
            setDislikes(prev => prev.filter(item => item !== dislike));
        }
    };

    const handlePersonalInfoChange = (field: string, value: string) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Save to localStorage for now
        localStorage.setItem('userProfile', JSON.stringify({
            allergies,
            dislikes,
            personalInfo,
            recommendedCalories: calculateRecommendedCalories()
        }));

        console.log('Profile saved:', { allergies, dislikes, personalInfo });

        toast({
            title: "Preferences saved",
            description: "Your dietary preferences and personal information have been updated successfully.",
        });
    };

    const recommendedCalories = calculateRecommendedCalories();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/')}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
                        </div>
                        <Button onClick={handleSave} className="bg-food-purple hover:bg-food-purple/90">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-600 flex items-center gap-2">
                                📊 Personal Information
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Enter your personal details to calculate your recommended daily calorie intake.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="25"
                                        value={personalInfo.age}
                                        onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        placeholder="70"
                                        value={personalInfo.weight}
                                        onChange={(e) => handlePersonalInfoChange('weight', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    placeholder="175"
                                    value={personalInfo.height}
                                    onChange={(e) => handlePersonalInfoChange('height', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={personalInfo.gender} onValueChange={(value) => handlePersonalInfoChange('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="activity">Activity Level</Label>
                                <Select value={personalInfo.activityLevel} onValueChange={(value) => handlePersonalInfoChange('activityLevel', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select activity level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                                        <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                        <SelectItem value="very">Very active (6-7 days/week)</SelectItem>
                                        <SelectItem value="extreme">Extremely active (2x/day)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {recommendedCalories > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-800 mb-1">Recommended Daily Calories</h4>
                                    <p className="text-2xl font-bold text-green-600">{recommendedCalories} calories</p>
                                    <p className="text-sm text-green-700 mt-1">Based on your personal information and activity level</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Allergies Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600 flex items-center gap-2">
                                ⚠️ Allergies & Intolerances
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Select any food allergies or intolerances you have. These ingredients will be avoided in recipe recommendations.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {commonAllergens.map((allergen) => (
                                    <div key={allergen} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`allergy-${allergen}`}
                                            checked={allergies.includes(allergen)}
                                            onCheckedChange={(checked) => handleAllergyChange(allergen, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`allergy-${allergen}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {allergen}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dislikes Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-orange-600 flex items-center gap-2">
                                👎 Food Dislikes
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Select foods you don't like. We'll try to minimize these in your recipe suggestions.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {commonDislikes.map((dislike) => (
                                    <div key={dislike} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`dislike-${dislike}`}
                                            checked={dislikes.includes(dislike)}
                                            onCheckedChange={(checked) => handleDislikeChange(dislike, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`dislike-${dislike}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {dislike}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Section */}
                {(allergies.length > 0 || dislikes.length > 0 || recommendedCalories > 0) && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Your Preferences Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recommendedCalories > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-blue-600 mb-2">Daily Calorie Goal:</h4>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-lg font-semibold">
                                        {recommendedCalories} calories
                                    </span>
                                </div>
                            )}

                            {allergies.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-red-600 mb-2">Allergies & Intolerances:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {allergies.map((allergen) => (
                                            <span
                                                key={allergen}
                                                className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {dislikes.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-orange-600 mb-2">Food Dislikes:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {dislikes.map((dislike) => (
                                            <span
                                                key={dislike}
                                                className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {dislike}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;
